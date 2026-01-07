<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webinar Countdown</title>
    <style>
        :root {
            --primary-color: #1a1a1a;
            --accent-color: #2563eb;
            --background-color: #f7f7f7;
            --text-color: #333333;
            --light-gray: #e0e0e0;
            --white: #ffffff;
            --transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        body {
            background-color: var(--background-color);
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            width: 100%;
            background-color: var(--white);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .logo {
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
        }

        .logo-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: var(--accent-color);
            border-radius: 50%;
            margin-left: 4px;
        }

        h1 {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 16px;
            line-height: 1.3;
            color: var(--primary-color);
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 24px;
            color: rgba(51, 51, 51, 0.85);
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        .countdown-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
        }

        .countdown-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .countdown-digit {
            font-size: 48px;
            font-weight: 700;
            background-color: var(--primary-color);
            color: var(--white);
            border-radius: 12px;
            padding: 16px 24px;
            min-width: 100px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            transition: var(--transition);
        }

        .countdown-digit::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 100%;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
            left: 0;
        }

        .countdown-label {
            font-size: 14px;
            font-weight: 500;
            color: var(--text-color);
            margin-top: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .accent-digit {
            background-color: var(--accent-color);
        }

        .registration-form {
            margin-top: 32px;
        }

        .form-group {
            margin-bottom: 16px;
        }

        input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid var(--light-gray);
            border-radius: 8px;
            font-size: 15px;
            transition: var(--transition);
            outline: none;
        }

        input:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        button {
            background-color: var(--accent-color);
            color: var(--white);
            border: none;
            border-radius: 8px;
            padding: 14px 24px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            width: 100%;
            margin-top: 8px;
            position: relative;
            overflow: hidden;
        }

        button:hover {
            background-color: #1e4fd0;
        }

        button::after {
            content: '';
            position: absolute;
            width: 50px;
            height: 100%;
            top: 0;
            left: -100px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shine-effect 3s infinite;
        }

        @keyframes shine-effect {
            0% {
                left: -100px;
            }
            20% {
                left: 100%;
            }
            100% {
                left: 100%;
            }
        }

        .event-details {
            display: flex;
            gap: 16px;
            margin-top: 40px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .event-detail {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #666;
        }

        .event-detail svg {
            width: 16px;
            height: 16px;
            color: var(--accent-color);
        }

        .accessibility-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            width: auto;
            padding: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .accessibility-toggle svg {
            width: 24px;
            height: 24px;
            color: var(--text-color);
        }

        .high-contrast {
            --primary-color: #000000;
            --accent-color: #0039cb;
            --background-color: #ffffff;
            --text-color: #000000;
            --light-gray: #cccccc;
        }
        
        .high-contrast .countdown-digit {
            color: #ffffff;
            background-color: #000000;
            border: 2px solid #0039cb;
        }
        
        .high-contrast .accent-digit {
            background-color: #0039cb;
        }

        .ribbon {
            position: absolute;
            top: 0;
            right: 0;
            width: 150px;
            height: 150px;
            overflow: hidden;
        }

        .ribbon-content {
            position: absolute;
            display: block;
            width: 225px;
            padding: 10px 0;
            background-color: var(--accent-color);
            box-shadow: 0 5px 10px rgba(0,0,0,.1);
            color: #fff;
            font-size: 13px;
            text-transform: uppercase;
            text-align: center;
            left: -25px;
            top: 30px;
            transform: rotate(45deg);
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .countdown-separator {
            font-size: 48px;
            font-weight: 700;
            color: var(--primary-color);
            margin-top: 16px;
        }

        .flash-animation {
            animation: flash 0.5s ease;
        }

        @keyframes flash {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.8;
            }
        }

        /* Responsive styles */
        @media (max-width: 600px) {
            .container {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 24px;
            }
            
            .countdown-container {
                gap: 10px;
            }
            
            .countdown-digit {
                font-size: 32px;
                padding: 12px 16px;
                min-width: 70px;
            }
            
            .countdown-separator {
                font-size: 32px;
                margin-top: 12px;
            }
            
            .countdown-label {
                font-size: 12px;
            }
            
            .event-details {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
            }
        }

        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: var(--accent-color);
            border-radius: 50%;
            opacity: 0.2;
            animation: float 15s infinite ease-in-out;
        }

        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-30px) translateX(20px);
            }
            50% {
                transform: translateY(-10px) translateX(40px);
            }
            75% {
                transform: translateY(-40px) translateX(10px);
            }
            100% {
                transform: translateY(0) translateX(0);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="particles" id="particles"></div>
        <button class="accessibility-toggle" id="accessibilityToggle" aria-label="Toggle high contrast mode">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </button>
        <div class="ribbon">
            <span class="ribbon-content">Limited Seats</span>
        </div>
        <div class="logo">DesignSummit<span class="logo-dot"></span></div>
        <h1>Advanced UX Design Principles for Enterprise Applications</h1>
        <p>Join our expert panel as they discuss cutting-edge UX strategies that transform complex enterprise systems into intuitive, efficient interfaces. Perfect for senior designers and product leaders.</p>
        
        <div class="countdown-container" id="countdown">
            <div class="countdown-item">
                <div class="countdown-digit" id="days">02</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-digit" id="hours">18</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-digit accent-digit" id="minutes">45</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <div class="countdown-digit" id="seconds">33</div>
                <div class="countdown-label">Seconds</div>
            </div>
        </div>
        
        <div class="registration-form">
            <div class="form-group">
                <input type="email" id="email" placeholder="Your work email" aria-label="Your work email">
            </div>
            <button type="button" id="registerButton" class="pulse">Reserve Your Spot</button>
        </div>
        
        <div class="event-details">
            <div class="event-detail">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>April 15, 2023</span>
            </div>
            <div class="event-detail">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>11:00 AM ET (75 min)</span>
            </div>
            <div class="event-detail">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Live + Recording</span>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Create particles
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                particlesContainer.appendChild(particle);
            }

            // Set the date we're counting down to (2 days, 18 hours, 45 minutes from now)
            const now = new Date();
            const countDownDate = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000) + (18 * 60 * 60 * 1000) + (45 * 60 * 1000) + (33 * 1000));

            // Update the count down every 1 second
            function updateCountdown() {
                // Get current date and time
                const now = new Date().getTime();
                
                // Find the distance between now and the count down date
                const distance = countDownDate - now;
                
                // Time calculations for days, hours, minutes and seconds
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Display the result
                document.getElementById("days").textContent = days.toString().padStart(2, '0');
                document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
                document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
                document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
                
                // Animated flash at certain milestones
                if (seconds === 0 && (minutes === 0 || minutes === 30)) {
                    document.getElementById("minutes").classList.add("flash-animation");
                    setTimeout(() => {
                        document.getElementById("minutes").classList.remove("flash-animation");
                    }, 500);
                }
                if (seconds === 0 && minutes === 0 && (hours === 0 || hours === 12)) {
                    document.getElementById("hours").classList.add("flash-animation");
                    setTimeout(() => {
                        document.getElementById("hours").classList.remove("flash-animation");
                    }, 500);
                }
                
                // If the count down is finished
                if (distance < 0) {
                    clearInterval(countdownInterval);
                    document.getElementById("days").textContent = "00";
                    document.getElementById("hours").textContent = "00";
                    document.getElementById("minutes").textContent = "00";
                    document.getElementById("seconds").textContent = "00";
                    
                    // Change button text when countdown ends
                    document.getElementById("registerButton").textContent = "Watch Recording";
                    document.getElementById("registerButton").classList.remove("pulse");
                }
            }
            
            // Initial call
            updateCountdown();
            
            // Set interval
            const countdownInterval = setInterval(updateCountdown, 1000);
            
            // Form submission handling
            document.getElementById("registerButton").addEventListener("click", function() {
                const email = document.getElementById("email").value;
                if (email && email.includes('@')) {
                    document.getElementById("registerButton").textContent = "Spot Reserved ✓";
                    document.getElementById("registerButton").style.backgroundColor = "#16a34a";
                    document.getElementById("registerButton").classList.remove("pulse");
                    
                    // Clear the input field
                    document.getElementById("email").value = "";
                } else {
                    // Highlight the input field for error
                    const emailInput = document.getElementById("email");
                    emailInput.style.borderColor = "#ef4444";
                    emailInput.placeholder = "Please enter a valid email";
                    
                    // Reset after a while
                    setTimeout(() => {
                        emailInput.style.borderColor = "";
                        emailInput.placeholder = "Your work email";
                    }, 3000);
                }
            });
            
            // Toggle high contrast mode
            document.getElementById("accessibilityToggle").addEventListener("click", function() {
                document.body.classList.toggle("high-contrast");
            });
        });
    </script>
</body>
</html>