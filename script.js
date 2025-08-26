class CountTimer {
  constructor() {
    this.isRunning = false;
    this.isPaused = false;
    this.isWorkSession = true;
    this.timeLeft = 25 * 60;
    this.totalTime = 25 * 60;
    this.workDuration = 25;
    this.breakDuration = 5;
    this.timer = null;
    this.currentTask = '';

    this.initializeElements();
    this.initializeEventListeners();
    this.updateDisplay();
  }

  initializeElements() {
    this.timerDisplay = document.getElementById('timerDisplay');
    this.timerStatus = document.getElementById('timerStatus');
    this.playBtn = document.getElementById('playBtn');
    this.stopBtn = document.getElementById('stopBtn');
    this.addTaskBtn = document.getElementById('addTaskBtn');
    this.workInput = document.getElementById('workInput');
    this.breakInput = document.getElementById('breakInput');
    this.sidebar = document.getElementById('sidebar');
    this.mainContent = document.getElementById('mainContent');
    this.mobileToggle = document.getElementById('mobileToggle');
    this.darkModeToggle = document.getElementById('darkModeToggle');
  }
  initializeEventListeners() {
    // Timer controls
    this.playBtn.addEventListener('click', () => this.toggleTimer());
    this.stopBtn.addEventListener('click', () => this.stopTimer());
    this.addTaskBtn.addEventListener('click', () => this.addTask());

    // Input field changes
    this.workInput.addEventListener('change', () => this.updateTimerFromInputs());
    this.breakInput.addEventListener('change', () => this.updateTimerFromInputs());

    // Start Now button
    document.querySelector('.start-now-btn').addEventListener('click', () => this.switchPage('timer'));
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
     item.addEventListener('click', (e) => this.switchPage(e.target.closest('.nav-item').dataset.page)); 
    });

    // Feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('click', (e) => this.selectFeature(e.currentTarget));
    });

    // Mobile menu
    this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

    // Dark mode toggle
    this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !this.sidebar.contains(e.target) && !this.mobileToggle.contains(e.target)) {
      this.sidebar.classList.remove('mobile-visible');
      }
    });
  }

  switchPage(page) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    // Update pages
    document.querySelectorAll('[class^="page-"]').forEach(p => p.classList.add('hidden'));
    document.getElementById(`${page}Page`).classList.remove('hidden');

    // Close mobile menu
    if (window.innerWidth <= 768) {
    this.sidebar.classList.remove('mobile-visible');
    }
  }

  selectFeature(card) {
    const workTime = parseInt(card.dataset.work);
    const breakTime = parseInt(card.dataset.break);
                
    this.workDuration = workTime;
    this.breakDuration = breakTime;
    this.timeLeft = workTime * 60;
    this.totalTime = workTime * 60;
                
    this.switchPage('timer');
    this.updateDisplay();
  }

  updateTimerFromInputs() {
    if (!this.isRunning && !this.isPaused) {
        const workMinutes = parseInt(this.workInput.value) || 25;
        const breakMinutes = parseInt(this.breakInput.value) || 5;
                    
        this.workDuration = workMinutes;
        this.breakDuration = breakMinutes;
                    
        if (this.isWorkSession) {
            this.timeLeft = workMinutes * 60;
            this.totalTime = workMinutes * 60;
        } else {
            this.timeLeft = breakMinutes * 60;
            this.totalTime = breakMinutes * 60;
        }
                    
        this.updateDisplay();
    }
  }

  toggleMobileMenu() {
    this.sidebar.classList.toggle('mobile-visible');
  }

  toggleDarkMode() {
    this.darkModeToggle.classList.toggle('active');
    document.body.classList.toggle('dark-mode');
  }

  addTask() {
    const task = prompt('Enter your task:');
    if (task) {
      this.currentTask = task;
      this.addTaskBtn.textContent = `Working on: ${task}`;
      this.timerStatus.textContent = 'Ready to start';
    }
  }

  toggleTimer() {
    if (!this.isRunning) {
        this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  startTimer() {
    this.isRunning = true;
    this.isPaused = false;
    this.timerStatus.textContent = this.isWorkSession ? 'Working...' : 'Break time';
                
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateDisplay();
                    
      if (this.timeLeft <= 0) {
          this.sessionComplete();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    this.isPaused = true;
    clearInterval(this.timer);
    this.timerStatus.textContent = 'Paused';

    // Start break countdown when paused
    this.startBreakCountdown();
  }

  startBreakCountdown() {
    const breakMinutes = parseInt(this.breakInput.value) || 5;
    let breakTimeLeft = breakMinutes * 60;
                
    const breakTimer = setInterval(() => {
        breakTimeLeft--;
                    
      // Update status with break countdown
      const breakMins = Math.floor(breakTimeLeft / 60);
      const breakSecs = breakTimeLeft % 60;
      this.timerStatus.textContent = `Break: ${breakMins.toString().padStart(2, '0')}:${breakSecs.toString().padStart(2, '0')}`;
                    
      if (breakTimeLeft <= 0) {
          clearInterval(breakTimer);
          this.timerStatus.textContent = 'Break finished - Ready to resume';
          this.playCompletionSound();
                        
          // Show break completion notification
          alert('Break time is over! Ready to get back to work?');
      }
    }, 1000);
                
    // Clear break timer if main timer is resumed or stopped
    const originalStart = this.startTimer.bind(this);
    const originalStop = this.stopTimer.bind(this);
                
    this.startTimer = () => {
        clearInterval(breakTimer);
        this.timerStatus.textContent = this.isWorkSession ? 'Working...' : 'Break time';
        this.startTimer = originalStart;
        this.stopTimer = originalStop;
        originalStart();
    };
                
    this.stopTimer = () => {
        clearInterval(breakTimer);
        this.startTimer = originalStart;
        this.stopTimer = originalStop;
        originalStop();
    };
  }

  stopTimer() {
    this.isRunning = false;
    this.isPaused = false;
    clearInterval(this.timer);
                
    if (this.isWorkSession) {
      this.timeLeft = this.workDuration * 60;
      this.totalTime = this.workDuration * 60;
    } else {
        this.timeLeft = this.breakDuration * 60;
        this.totalTime = this.breakDuration * 60;
    }
                
    this.timerStatus.textContent = 'Ready to Focus';
    this.updateDisplay();
  }

  sessionComplete() {
    this.isRunning = false;
    clearInterval(this.timer);
                
    // Play completion sound
    this.playCompletionSound();
                
    // Switch sessions
    this.isWorkSession = !this.isWorkSession;
                
    if (this.isWorkSession) {
      this.timeLeft = this.workDuration * 60;
      this.totalTime = this.workDuration * 60;
      this.timerStatus.textContent = 'Break complete! Ready for work';
    } else {
        this.timeLeft = this.breakDuration * 60;
        this.totalTime = this.breakDuration * 60;
        this.timerStatus.textContent = 'Work complete! Time for a break';
    }
                
    this.updateDisplay();
                
    // Show notification
    const message = this.isWorkSession ? 
      'Break time is over! Ready for another work session?' : 
      'Work session complete! Time for a well-deserved break!';
    alert(message);
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  playCompletionSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
                    
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
                    
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
                    
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('Audio not supported');
    }
  }
}

    // Initialize the app
    window.addEventListener('DOMContentLoaded', () => {
      new CountTimer();
});
