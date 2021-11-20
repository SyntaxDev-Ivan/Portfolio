window.onload = () => load()

async function load() {
    let errorBox = document.querySelector(".error")
    let errorBoxText = document.querySelector(".error p")

    let registerBtn = document.querySelector(".register-btn")

    addAllEventListener()

    function addAllEventListener() {
        registerBtn.addEventListener("click", register)
    }

    async function register() {
        let name = document.querySelector(".name").value
        let email = document.querySelector(".email").value
        let pw = document.querySelector(".pw").value
        let repeatPw = document.querySelector(".repeat-pw").value


        let emailValid = await checkEmail(email)
        if (!emailValid) return showErrBox("Deine Email ist ungültig!")

        let validPw = await checkPasswords(pw, repeatPw, email, name)
        if (validPw.err) return showErrBox(validPw.error)

        let validName = await checkName(name)
        if (validName.err) return showErrBox(validName.error)

        showSuccessBox("Du hast dich erfolgreich Registriert!")
    }

    function showErrBox(errText) {
        errorBox.style.display = "flex"
        errorBoxText.innerText = errText
    }

    function showSuccessBox(success) {
        errorBox.style.background = "green"
        errorBox.style.display = "flex"
        errorBoxText.innerText = success
    }

    async function checkEmail(email) {
        let corretForm = /\S+@\S+\.\S+/;
        return corretForm.test(email);
    }

    async function checkPasswords(pw1, pw2, email, name) {
        if (pw1 != pw2) return { err: true, error: "Deine Passwörter stimmen nicht überein!" }

        if (pw1.toString().length < 8) return { err: true, error: "Dein Passwort muss mindestens 8 Zeichen enthalten!" }

        if (pw1.toString() == email || pw1.toString() == name) return { err: true, error: "Dein Passwort darf nicht mit deinen persönlichen Informationen übereinstimmen!" }

        if (!/\d/.test(pw1.toString())) return { err: true, error: "Dein Passwort muss mindestens 1 Zahl enthalten!" }

        if (pw1.toString().toLowerCase() == pw1.toString()) return { err: true, error: "Dein Passwort muss auch Großbuchstaben enthalten!" }

        if (pw1.toString().toUpperCase() == pw1.toString()) return { err: true, error: "Dein Passwort muss auch Kleinbuchstaben enthalten!" }

        return { err: false }
    }

    async function checkName(name) {
        if (name.split(" ").join("") == name) return { err: true, error: "Dein Name muss mindestens 2 Wörter enthalten!" }
        if (name.length > 50) return { err: true, error: "Bist du sicher, dass dies dein Name ist?" }

        return { err: false }
    }
}