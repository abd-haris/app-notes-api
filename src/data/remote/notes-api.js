import '../../components/note-item.js';
import '../../components/note-list.js';

const baseUrl = 'https://notes-api.dicoding.dev/v2';

const swal = require('sweetalert');

const getNotesFromApi = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const responseJson = await response.json();
    const notes = responseJson.data;

    if (!response.ok) {
      showResponseMessage('Gagal memuat data, periksa internet!');
    }
    return notes;
  } catch (error) {
    showResponseMessage(error);
  }
};

const addNoteToApi = async (book) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    };
    const response = await fetch(`${baseUrl}/notes`, options);
    showSuccessMessage('Catatan berhasil ditambahkan');
    getNotesFromApi();
    return await response.json();
  } catch (error) {
    showResponseMessage(error);
  }
};

const deleteNoteFromApi = async (noteId) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${baseUrl}/notes/${noteId}`, options);
    showDeleteMessage('Catatan berhasil dihapus');
    document
      .querySelector('.swal-button')
      .addEventListener('click', function () {
        location.reload();
      });
    return await response.json();
  } catch (error) {
    showResponseMessage(error);
  }
};

const getArchivedNotesFromApi = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes/archived`);
    const responseJson = await response.json();
    const notes = responseJson.data;

    if (!response.ok) {
      showResponseMessage('Gagal memuat data, periksa internet!');
    }
    return notes;
  } catch (error) {
    showResponseMessage(error);
  }
};

const archivedNotesApi = async (noteId) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${baseUrl}/notes/${noteId}/archive`, options);
    showSuccessMessage('Catatan berhasil diarsipkan');
    document
      .querySelector('.swal-button')
      .addEventListener('click', function () {
        location.reload();
      });
    return await response.json();
  } catch (error) {
    showResponseMessage(error);
  }
};

const unarchivedNotesApi = async (noteId) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${baseUrl}/notes/${noteId}/unarchive`,
      options
    );
    showSuccessMessage('Catatan tidak diarsipkan');
    return await response.json();
  } catch (error) {
    showResponseMessage(error);
  }
};

const showResponseMessage = (message = 'Silahkan cek internet anda') => {
  swal(message);
  swal({
    title: 'Gagal',
    text: message,
    icon: 'error',
  });
};

const showSuccessMessage = (message = 'Silahkan cek internet anda') => {
  swal({
    title: 'Berhasil',
    text: message,
    icon: 'success',
  });
};

const showDeleteMessage = (message = 'Siahkan cek internet anda') => {
  swal({
    title: 'Peringatan',
    text: message,
    icon: 'warning',
  });
};

export {
  getNotesFromApi,
  addNoteToApi,
  deleteNoteFromApi,
  getArchivedNotesFromApi,
  archivedNotesApi,
  unarchivedNotesApi,
  showResponseMessage,
  showSuccessMessage,
};
