// Function to upload the image and then find similar pets
async function uploadAndFindSimilarPets() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);

    // Step 1: Upload the image
    let uploadResponse = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    if (uploadResponse.ok) {
        // Step 2: Use the image ID to find similar pets
        const { image_id } = await uploadResponse.json();
        findSimilarPets(image_id);
    } else {
        console.error('Upload Error:', await uploadResponse.text());
    }
}

// Modified function to find similar pets using an image ID
async function findSimilarPets(imageId) {
    const response = await fetch('/find_similar_pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_id: imageId })
    });

    if (response.ok) {
        const similarPets = await response.json();
        displaySimilarPets(similarPets);
    } else {
        console.error('Error finding similar pets:', response.statusText);
    }
}