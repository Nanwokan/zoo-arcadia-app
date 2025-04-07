let selectedFiles = [];

document.querySelectorAll('.file-upload-wrapper').forEach((wrapper, zoneIndex) => {
  const dropZone = wrapper.querySelector('.drop-zone');
  const fileInput = wrapper.querySelector('.upload-image');
  const previewContainer = wrapper.querySelector('.preview-grid');

  

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    for (let file of files) {
      if (!file.type.startsWith("image/")) continue;
      selectedFiles.push(file);
    }
    updatePreview();
  }

  function updatePreview() {
    previewContainer.innerHTML = '';
    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const item = document.createElement('div');
        item.classList.add('preview-item');
        item.innerHTML = `
          <img src="${e.target.result}" alt="preview">
          <button type="button" class="remove-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
        item.querySelector('.remove-btn').addEventListener('click', () => {
          removeFile(index);
        });
        previewContainer.appendChild(item);
      };
      reader.readAsDataURL(file);
    });

    const dataTransfer = new DataTransfer();
    selectedFiles.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;
  }

  function removeFile(index) {
    selectedFiles.splice(index, 1);
    updatePreview();
  }
});

