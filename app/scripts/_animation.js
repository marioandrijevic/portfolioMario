const shadowBox = document.querySelector(".circle4");

shadowBox.addEventListener("mousemove", (e) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    const boxRect = shadowBox.getBoundingClientRect();
    const boxX = boxRect.left + boxRect.width / 2;
    const boxY = boxRect.top + boxRect.height / 2;
    const distanceX = Math.abs(mouseX - boxX);
    const distanceY = Math.abs(mouseY - boxY);
    const maxDistance = 100; // Maximum distance to expand the shadow box
    const expansion = Math.max(0, maxDistance - distanceX - distanceY) / maxDistance;
    if (expansion > 0) {
        shadowBox.classList.add("expand");
        shadowBox.style.boxShadow = `0 0 ${20 + 20 * expansion}px rgba(0, 0, 0, ${0.5 + 0.3 * expansion})`;
    } else {
        shadowBox.classList.remove("expand");
        shadowBox.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
    }
});