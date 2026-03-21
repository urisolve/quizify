document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.topic-link[data-topic-id]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var topicId = link.getAttribute('data-topic-id');
      fetch('/topic-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topicId: topicId })
      })
      .then(response => {
        // If the response is HTML, just redirect
        if (response.redirected) {
          window.location.href = response.url;
          return;
        }
        // If the response is JSON, try to parse and redirect
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          // fallback: reload page
          window.location.reload();
        }
      })
      .then(data => {
        if (data && data.redirect) {
          window.location.href = data.redirect;
        }
      })
      .catch(error => {
        console.error('Error sending topic log request:', error);
      });
    },);
  });
});
