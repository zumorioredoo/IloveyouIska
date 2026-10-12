const buttonArea = document.querySelector("#button-area");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const hint = document.querySelector(".hint");
const messageDialog = document.querySelector("#message-dialog");
const closeDialog = document.querySelector("#close-dialog");

function moveNoButton() {
    const areaBounds = buttonArea.getBoundingClientRect();
    const buttonBounds = noButton.getBoundingClientRect();
    const yesBounds = yesButton.getBoundingClientRect();
    const maxLeft = Math.max(0, areaBounds.width - buttonBounds.width);
    const maxTop = Math.max(0, areaBounds.height - buttonBounds.height);
    const yesLeft = yesBounds.left - areaBounds.left;
    const yesTop = yesBounds.top - areaBounds.top;
    const gap = 16;
    const candidates = [];

    for (let attempt = 0; attempt < 30; attempt += 1) {
        const left = Math.random() * maxLeft;
        const top = Math.random() * maxTop;
        const overlapsYes = left < yesLeft + yesBounds.width + gap
            && left + buttonBounds.width > yesLeft - gap
            && top < yesTop + yesBounds.height + gap
            && top + buttonBounds.height > yesTop - gap;

        if (!overlapsYes) candidates.push({ left, top });
    }

    const destination = candidates[Math.floor(Math.random() * candidates.length)]
        ?? { left: maxLeft, top: 0 };

    noButton.style.position = "absolute";
    noButton.style.left = `${destination.left}px`;
    noButton.style.top = `${destination.top}px`;
    hint.textContent = "Oops, try the other button! 😜";
}

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("focus", moveNoButton);
noButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    moveNoButton();
});

yesButton.addEventListener("click", () => {
    messageDialog.showModal();
});

closeDialog.addEventListener("click", () => messageDialog.close());
