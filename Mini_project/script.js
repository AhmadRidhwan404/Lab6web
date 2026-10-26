
const form = document.getElementById("registrationForm");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const sesi = document.getElementById("sesi");

const namaError = document.getElementById("namaError");
const emailError = document.getElementById("emailError");
const sesiError = document.getElementById("sesiError");

const charCount = document.getElementById("charCount");
const statusMessage = document.getElementById("statusMessage");
const resetButton = document.getElementById("resetButton");

// Menghitung karakter dan memperbarui ringkasan
function updateSummary() {
    charCount.textContent = `${nama.value.length}/100 karakter`;

    document.getElementById("summaryNama").textContent =
        nama.value.trim() || "-";

    document.getElementById("summaryEmail").textContent =
        email.value.trim() || "-";

    document.getElementById("summarySesi").textContent =
        sesi.value || "-";
}

// Menampilkan pesan kesalahan
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add("invalid");
}

// Menghapus pesan kesalahan
function clearError(input, errorElement) {
    errorElement.textContent = "";
    input.classList.remove("invalid");
}

// Validasi nama
function validateNama() {
    const value = nama.value.trim();

    if (value === "") {
        showError(nama, namaError, "Nama wajib diisi.");
        return false;
    }

    if (value.length < 3) {
        showError(nama, namaError,
            "Nama minimal 3 karakter.");
        return false;
    }

    clearError(nama, namaError);
    return true;
}

// Validasi email
function validateEmail() {
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError(email, emailError, "Email wajib diisi.");
        return false;
    }

    if (!emailPattern.test(value)) {
        showError(email, emailError,
            "Masukkan alamat email yang valid.");
        return false;
    }

    clearError(email, emailError);
    return true;
}

// Validasi pilihan sesi
function validateSesi() {
    if (sesi.value === "") {
        showError(sesi, sesiError,
            "Silakan pilih sesi workshop.");
        return false;
    }

    clearError(sesi, sesiError);
    return true;
}

// Event input: nama dan email
nama.addEventListener("input", function () {
    updateSummary();
    clearError(nama, namaError);
});

email.addEventListener("input", function () {
    updateSummary();
    clearError(email, emailError);
});

// Event change: pilihan sesi
sesi.addEventListener("change", function () {
    updateSummary();
    clearError(sesi, sesiError);
});

// Event submit: mengirim formulir
form.addEventListener("submit", function (event) {
    event.preventDefault();

    statusMessage.className = "status-message";
    statusMessage.textContent = "";

    const namaValid = validateNama();
    const emailValid = validateEmail();
    const sesiValid = validateSesi();

    if (!namaValid || !emailValid || !sesiValid) {
        statusMessage.textContent =
            "Pendaftaran gagal. Periksa kembali data kamu.";
        statusMessage.className =
            "status-message error-status";

        const firstInvalid =
            document.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;
    }

    statusMessage.textContent =
        `Pendaftaran berhasil! Terima kasih, ${nama.value.trim()}.`;
    statusMessage.className =
        "status-message success-status";
});

// Event click: reset formulir
resetButton.addEventListener("click", function () {
    form.reset();

    namaError.textContent = "";
    emailError.textContent = "";
    sesiError.textContent = "";

    nama.classList.remove("invalid");
    email.classList.remove("invalid");
    sesi.classList.remove("invalid");

    statusMessage.textContent = "";
    statusMessage.className = "status-message";

    updateSummary();
});

// Menampilkan kondisi awal
updateSummary();
