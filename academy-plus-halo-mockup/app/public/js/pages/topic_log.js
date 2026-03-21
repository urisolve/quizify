document.addEventListener('DOMContentLoaded', function() {

  document.querySelectorAll('.subtopic-name.clickable').forEach(function(name) {
    name.addEventListener('click', function() {
      var subtopicId = name.getAttribute('data-subtopic-id');
      
      // Remove 'selected' from all rows
      document.querySelectorAll('.subtopic-row').forEach(function(row) {
        row.classList.remove('selected');
      });
      // Add 'selected' to the clicked row
      var row = name.closest('.subtopic-row');
      if (row) row.classList.add('selected');

      // Hide all details rows first
      document.querySelectorAll('.subtopic-log-details').forEach(function(row) {
        row.style.display = 'none';
      });
      document.querySelectorAll('.week-row').forEach(function(row) {
        row.style.display = 'none';
      });
      // If not open, open; if open, close
      var detailsRow = document.getElementById('details-' + subtopicId);
      var weekRow = document.getElementById('week-' + subtopicId);
      var isOpen = detailsRow && detailsRow.style.display === 'table-row';
      // Close all accordions first
      document.querySelectorAll('.subtopic-log-details').forEach(function(row) {
        row.style.display = 'none';
      });
      document.querySelectorAll('.week-row').forEach(function(row) {
        row.style.display = 'none';
      });
      // If not open, open; if open, close
      if (!isOpen) {
        if (detailsRow) {
          detailsRow.classList.remove('hidden');
          detailsRow.style.display = 'table-row';
        }
        if (weekRow) weekRow.style.display = 'table-row';

        // Reset week selector to 'all' and show all stats by default
        var weekSelect = document.getElementById('week-select-' + subtopicId);
        if (weekSelect) {
          weekSelect.value = 'all';
          var statsBodies = detailsRow.querySelectorAll('.difficulty-stats');
          statsBodies.forEach(function(tb) {
            tb.style.display = tb.getAttribute('data-week') === 'all' ? '' : 'none';
          });
        }
      }
    });
  });

  // Add event listener for week selector to toggle stats
  document.querySelectorAll('.week-select').forEach(function(select) {
    select.addEventListener('change', function() {
      var subtopicId = select.getAttribute('data-subtopic-id');
      var detailsRow = document.getElementById('details-' + subtopicId);
      if (!detailsRow) return;
      var selectedWeek = select.value;
      var statsBodies = detailsRow.querySelectorAll('.difficulty-stats');
      statsBodies.forEach(function(tb) {
        tb.style.display = tb.getAttribute('data-week') === selectedWeek ? '' : 'none';
      });
    });
  });
});

document.querySelectorAll('.anex-img-hover').forEach(function(hoverElem) {
  const img = hoverElem.querySelector('.anex-img-preview');
  if (!img) return;
  hoverElem.addEventListener('mousemove', function(e) {
    img.style.display = 'block';
    img.style.left = (e.clientX + 20) + 'px';
    img.style.top = (e.clientY - img.offsetHeight / 2) + 'px';
  });
  hoverElem.addEventListener('mouseleave', function() {
    img.style.display = 'none';
  });
});
document.querySelectorAll('.anex-img-hover').forEach(function(hoverElem) {
  const img = hoverElem.querySelector('.anex-img-preview');
  if (!img) return;
  hoverElem.addEventListener('mousemove', function(e) {
    img.style.display = 'block';
    img.style.left = (e.clientX + 20) + 'px';
    img.style.top = (e.clientY - img.offsetHeight / 2) + 'px';
  });
  hoverElem.addEventListener('mouseleave', function() {
    img.style.display = 'none';
  });
});