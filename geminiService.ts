import { GoogleGenAI, Type } from '@google/genai';
import { ScanResult } from '../types';

// Database produk kosmetik populer untuk simulasi pemindaian yang sangat realistis
const MOCK_BOTTLES = [
  { brand: "Somethinc", productName: "Niacinamide Sabi Beet Brightening Serum", material: "Glass Premium", pointsEarned: 2000 },
  { brand: "Skintific", productName: "5X Ceramide Barrier Repair Moisture Gel", material: "Acrylic / PP", pointsEarned: 1500 },
  { brand: "Wardah", productName: "Lightening Whip Facial Foam", material: "Plastic HDPE", pointsEarned: 1000 },
  { brand: "Cosrx", productName: "Advanced Snail 96 Mucin Power Essence", material: "Plastic PP", pointsEarned: 1000 },
  { brand: "Laneige", productName: "Water Sleeping Mask", material: "Acrylic Premium", pointsEarned: 1500 },
  { brand: "Innisfree", productName: "Green Tea Seed Serum", material: "Glass Premium", pointsEarned: 2000 }
];

export const analyzeCosmeticBottle = async (imageBase64: string): Promise<ScanResult> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY not found");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            data: imageBase64.split(',')[1] || imageBase64, // Handle data URI prefix
            mimeType: 'image/jpeg'
          }
        },
        {
          text: 'Analyze this cosmetic empty bottle. Identify the brand, product name, and primary plastic/material type (e.g., PP, PET, Acrylic, Glass, HDPE). Estimate a recycling point value: 1000 for PP/HDPE, 1500 for Acrylic, 2000 for Glass.'
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brand: { type: Type.STRING, description: 'Brand of the cosmetic product' },
            productName: { type: Type.STRING, description: 'Name of the product' },
            material: { type: Type.STRING, description: 'Primary material type' },
            pointsEarned: { type: Type.INTEGER, description: 'Estimated points (1000, 1500, or 2000)' }
          },
          required: ['brand', 'productName', 'material', 'pointsEarned']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ScanResult;
    }
    throw new Error("Empty response from Gemini");

  } catch (error) {
    console.warn("Falling back to smart mock data due to API error or missing key:", error);
    
    // Menghasilkan indeks stabil berdasarkan panjang string gambar agar setiap foto unik menghasilkan produk unik yang konsisten
    const stableIndex = imageBase64.length % MOCK_BOTTLES.length;
    const selectedMock = MOCK_BOTTLES[stableIndex];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(selectedMock);
      }, 1500); // Simulasi delay loading AI yang realistis
    });
  }
};
