// Mock integrations for development
// In a real app, these would be actual service integrations

export const Core = {
  InvokeLLM: async ({ prompt }) => {
    console.log('Mock InvokeLLM called with prompt:', prompt);
    
    // Mock AI responses based on prompt content
    if (prompt.toLowerCase().includes('dream')) {
      return "Your dream reveals a deep connection to your subconscious wisdom. The symbols you saw represent transformation and new beginnings on your spiritual path.";
    }
    
    if (prompt.toLowerCase().includes('love') || prompt.toLowerCase().includes('compatibility')) {
      return "The cosmic energies show a beautiful harmony between these souls. There is potential for deep understanding and spiritual growth together.";
    }
    
    if (prompt.toLowerCase().includes('energy') || prompt.toLowerCase().includes('cleansing')) {
      return "I sense heavy energy around you that needs clearing. Begin by lighting a white candle and visualizing golden light surrounding your entire being. Breathe deeply and release what no longer serves you.";
    }
    
    if (prompt.toLowerCase().includes('advisor') || prompt.toLowerCase().includes('spiritual')) {
      return "I sense you are seeking guidance on your spiritual path. Trust your intuition - it is your greatest compass. The answers you seek are already within you, waiting to be discovered.";
    }
    
    // Default response
    return "The universe is guiding you toward your highest good. Trust the process and remain open to the signs and synchronicities around you.";
  },

  SendEmail: async (data) => {
    console.log('Mock SendEmail:', data);
    return { success: true };
  },

  UploadFile: async ({ file }) => {
    console.log('Mock UploadFile:', file.name);
    // Create a mock URL for the uploaded file
    const mockUrl = `https://example.com/uploads/${Date.now()}_${file.name}`;
    return { file_url: mockUrl };
  },

  GenerateImage: async (data) => {
    console.log('Mock GenerateImage:', data);
    return { image_url: 'https://via.placeholder.com/400x400?text=Generated+Image' };
  },

  ExtractDataFromUploadedFile: async (data) => {
    console.log('Mock ExtractDataFromUploadedFile:', data);
    return { extracted_data: 'Mock extracted data' };
  }
};

// Export individual functions for backward compatibility
export const InvokeLLM = Core.InvokeLLM;
export const SendEmail = Core.SendEmail;
export const UploadFile = Core.UploadFile;
export const GenerateImage = Core.GenerateImage;
export const ExtractDataFromUploadedFile = Core.ExtractDataFromUploadedFile;