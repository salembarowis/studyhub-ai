const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      console.log("Sending request...");

      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      console.log("Response:", data);

      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert(data.message || "Server Error");
      }

    } catch (error) {
      console.error(error);
      alert("Connection Error: " + error.message);
    }
  });
}