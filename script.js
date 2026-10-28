// ======================================
// ABLAMA ÖZEL WEB SİTESİ
// ======================================


// ŞİFRE AYARLARI
// Buraya ablanın sana seslenirken kullandığı
// kelimeyi ve emojiyi yaz.

const SECRET_PHRASE = "Emoli";


// ELEMENTLER

const loginScreen = document.getElementById("loginScreen");
const mainContent = document.getElementById("mainContent");

const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const errorMessage = document.getElementById("errorMessage");

const backgroundMusic = document.getElementById("backgroundMusic");

const openLetterButton = document.getElementById("openLetterButton");
const closeLetterButton = document.getElementById("closeLetterButton");

const letterModal = document.getElementById("letterModal");
const memoryVideo = document.getElementById("memoryVideo");


// MÜZİK SESİ

backgroundMusic.volume = 0.35;
memoryVideo.volume = 1;


// ŞİFRE KONTROLÜ

function checkPassword() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === SECRET_PHRASE) {

        errorMessage.textContent = "";

        loginScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");

        // Sayfa en baştan açılsın.
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        // Kullanıcı etkileşimi olduğu için
        // müzik başlatılmayı dener.
        backgroundMusic.play().catch(() => {
            console.log("Müzik için yeniden oynatma izni gerekebilir.");
        });

    } else {

        errorMessage.textContent =
            "Bu kelime değil gibi... Bir daha düşün canım. ♡";

        passwordInput.value = "";
        passwordInput.focus();

    }

}


// BUTONA BASARAK GİRİŞ

loginButton.addEventListener("click", checkPassword);


// ENTER TUŞUYLA GİRİŞ

passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkPassword();
    }

});


// MEKTUBU AÇ

openLetterButton.addEventListener("click", async function() {

    letterModal.classList.remove("hidden");

    // Mektup açılınca pencere başa gelsin.
    letterModal.scrollTop = 0;

    // Videoyu başlangıçtan başlat.
    memoryVideo.currentTime = 0;

    // Video açılınca müzik duraklasın.
    backgroundMusic.pause();

    // Video kendi kendine oynatılmayı denesin.
    try {

        await memoryVideo.play();

    } catch (error) {

        // Telefon tarayıcısı otomatik oynatmayı
        // engellerse kullanıcı oynat tuşuna basabilir.
        console.log("Videoyu başlatmak için oynat tuşuna bas.");

    }

});


// MEKTUBU KAPAT

function closeLetter() {

    // Video dursun ve başa dönsün.
    memoryVideo.pause();
    memoryVideo.currentTime = 0;

    // Pencere kapansın.
    letterModal.classList.add("hidden");

    // Sayfa mektuba tıklamadan önceki
    // konumunda kalsın.

    // Arka plan müziği kaldığı yerden sürsün.
    backgroundMusic.play().catch(() => {
        console.log("Müzik yeniden başlatılamadı.");
    });

}


// KAPAT BUTONU

closeLetterButton.addEventListener("click", closeLetter);


// VİDEO BİTİNCE

memoryVideo.addEventListener("ended", function() {

    // Video bittiğinde görüntü son karede kalır.
    // Kapat butonu kullanıcının kontrolünde kalır.

    memoryVideo.pause();

});


// VİDEO OYNADIĞINDA MÜZİĞİ DURDUR

memoryVideo.addEventListener("play", function() {

    backgroundMusic.pause();

});


// VİDEO DURAKLATILIRSA MÜZİĞİ OTOMATİK BAŞLATMA.
// Müzik yalnızca mektup kapatıldığında başlar.


// ESC TUŞUYLA MEKTUBU KAPAT

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        !letterModal.classList.contains("hidden")
    ) {

        closeLetter();

    }

});


// MEKTUP DIŞINDAKİ KOYU ALANA BASARAK KAPAT

letterModal.addEventListener("click", function(event) {

    if (event.target === letterModal) {
        closeLetter();
    }

});