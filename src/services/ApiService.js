

export const updateApiKeys = (keys) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mock API call: received keys ->", keys);
        resolve({
          data: {
            data: {
              updateApiKeys: {
                success: true,
                message: "Mock: API keys updated successfully!"
              }
            }
          }
        });
      }, 1000); // Simulate network delay
    });
  };
  
