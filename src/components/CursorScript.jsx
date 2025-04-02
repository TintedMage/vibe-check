"use client"

import { useEffect } from 'react';

export default function CursorScript() {
    useEffect(() => {
        const cursor = document.getElementById('cursor');
        if (!cursor) return;

        // Track mouse and cursor positions separately
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // The lag factor - smaller = more lag (0.05-0.2 works well)
        const lagFactor = 0.1;

        // Update mouse position on mouse move
        const handleMouseMove = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            // Check if over text element (for scaling)
            const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
            const isTextElement = isOverText(elementUnderCursor);

            if (isTextElement) {
                cursor.style.transform = 'scale(3)';
            } else {
                cursor.style.transform = 'scale(1)';
            }
        };

        // Animation loop for smooth cursor movement
        const animateCursor = () => {
            // Calculate distance to travel
            const distX = mouseX - cursorX;
            const distY = mouseY - cursorY;

            // Move cursor a percentage of the distance (linear interpolation)
            cursorX += distX * lagFactor;
            cursorY += distY * lagFactor;

            // Apply the position
            cursor.style.left = `${cursorX - 10}px`;
            cursor.style.top = `${cursorY - 10}px`;

            // Continue the animation loop
            requestAnimationFrame(animateCursor);
        };

        // Check if element is text
        const isOverText = (element) => {
            if (!element) return false;

            const textTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
                'A', 'LI', 'TD', 'TH', 'LABEL', 'BUTTON'];

            if (textTags.includes(element.tagName)) return true;

            // Check for text nodes
            for (let i = 0; i < element.childNodes.length; i++) {
                if (element.childNodes[i].nodeType === Node.TEXT_NODE &&
                    element.childNodes[i].textContent.trim() !== '') {
                    return true;
                }
            }

            return false;
        };

        // Start the mouse tracking and animation
        document.addEventListener('mousemove', handleMouseMove);
        animateCursor();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return null;
}