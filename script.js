document.getElementById('resume-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();
    const skills = document.getElementById('skills').value.trim();

    if (!name || !contact || !experience || !education || !skills) {
        alert('Please fill in all fields.');
        return;
    }

    const userInput = `
        Name: ${name}
        Contact: ${contact}
        Experience: ${experience}
        Education: ${education}
        Skills: ${skills}
    `;

    const outputElement = document.getElementById('output');
    outputElement.innerText = 'Generating resume...'; // 로딩 상태 표시

    try {
        const response = await fetch('https://open-api.jejucodingcamp.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `Generate a professional resume based on the following details:\n${userInput}\n`,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const resume = data.choices[0].text;

        outputElement.innerText = resume;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Failed to generate resume. Please try again.');
        outputElement.innerText = ''; // 오류 발생 시 로딩 상태 제거
    }
});
