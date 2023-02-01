const deleteBlog = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const blog_id = document.querySelector('.edit-form').getAttribute('data-id');

  if ( blog_id ) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/blogs/${blog_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteBlog);
