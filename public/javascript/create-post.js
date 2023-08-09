// Function to handle creating a new post.
async function createPostHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the click event.

    // Redirect the user to the new post creation page on the dashboard.
    document.location.replace('/dashboard/new');
}

// Add an event listener to the element with ID 'create-new-post'.
document.querySelector('#create-new-post').addEventListener('click', createPostHandler);