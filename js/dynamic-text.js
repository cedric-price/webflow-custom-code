.dynamic-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dynamic-text {
            white-space: nowrap;
            font-weight: 900;
            line-height: 1;
        }
</style>



<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        adjustTextSize();

        window.addEventListener('resize', () => {
            adjustTextSize();
        });
    });

    function adjustTextSize() {
        // Assuming the elements have the class 'dynamic-container' and 'dynamic-text'
        const dynamicContainers = document.querySelectorAll('.dynamic-container');
        const dynamicTexts = document.querySelectorAll('.dynamic-text');

        dynamicContainers.forEach((dynamicContainer, index) => {
            const containerWidth = dynamicContainer.offsetWidth;
            const dynamicTextWidth = dynamicTexts[index].offsetWidth;

            const fontSize = (containerWidth / dynamicTextWidth) * parseFloat(window.getComputedStyle(dynamicTexts[index]).fontSize);

            dynamicTexts[index].style.fontSize = fontSize + 'px';
        });
    }
