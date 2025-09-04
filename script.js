// FAQ Accordion
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const accordionItem = button.parentElement;
    const isActive = accordionItem.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      accordionItem.classList.add('active');
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Add active class to nav items on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Hero Carousel Functionality
class HeroCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.carousel-slide');
    this.dots = document.querySelectorAll('.dot');
    this.autoPlayInterval = null;
    this.isHovering = false;
    
    this.init();
  }
  
  init() {
    // Debug log
    console.log('Initializing carousel with', this.slides.length, 'slides');
    
    // Set up dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        console.log('Dot clicked, going to slide', index);
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });
    
    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        console.log('Mouse enter, pausing autoplay');
        this.isHovering = true;
        this.pauseAutoPlay();
      });
      
      carousel.addEventListener('mouseleave', () => {
        console.log('Mouse leave, starting autoplay');
        this.isHovering = false;
        this.startAutoPlay();
      });
    } else {
      console.warn('Carousel element not found');
    }
    
    // Start autoplay
    console.log('Starting autoplay');
    this.startAutoPlay();
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        console.log('Left arrow key pressed');
        this.prevSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        console.log('Right arrow key pressed');
        this.nextSlide();
        this.resetAutoPlay();
      }
    });
  }
  
  goToSlide(slideIndex) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');
    
    // Add active class to new slide and dot
    this.currentSlide = slideIndex;
    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');
    
    // Add animation classes for smooth transitions
    this.slides[this.currentSlide].style.animation = 'slideInLeft 0.8s ease-out';
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    console.log('Moving from slide', this.currentSlide, 'to slide', nextIndex);
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }
  
  startAutoPlay() {
    if (!this.isHovering && !this.autoPlayInterval) {
      console.log('Starting autoplay interval');
      this.autoPlayInterval = setInterval(() => {
        console.log('Autoplay: changing to next slide');
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
  }
  
  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }
}

// Enhanced Scroll Animation with Intersection Observer
class EnhancedScrollAnimation {
  constructor() {
    this.observer = null;
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupRevealAnimations();
  }
  
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.classList.add('visible');
          
          // Add stagger animation for plan cards
          if (target.classList.contains('plan-card')) {
            const planTypes = target.querySelectorAll('.plan-type');
            const features = target.querySelectorAll('.plan-features li');
            
            planTypes.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('visible');
              }, index * 100);
            });
            
            features.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('visible');
              }, index * 100);
            });
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    this.observeElements();
  }
  
  observeElements() {
    // Observe plans header
    const plansHeader = document.querySelector('.plans-header');
    if (plansHeader) {
      this.observer.observe(plansHeader);
    }
    
    // Observe all plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
      this.observer.observe(card);
    });
  }
  
  setupRevealAnimations() {
    // Add entrance animation for elements
    const animatedElements = document.querySelectorAll('.plans-header, .plan-card');
    animatedElements.forEach(element => {
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }
  
  // Refresh observer if DOM changes
  refresh() {
    this.observeElements();
  }
}

// Add parallax effect for hero carousel
function setupParallaxEffect() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    carousel.style.transform = `translateY(${parallax}px)`;
  });
}

// Add smooth scroll reveal for benefit items
function setupBenefitAnimations() {
  const benefitItems = document.querySelectorAll('.benefit-item');
  
  const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  benefitItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    benefitObserver.observe(item);
  });
}

// Plan Calculator Functionality
class PlanCalculator {
  constructor() {
    this.currentStep = 1;
    this.userUsage = {
      data: 10,
      minutes: 500,
      sms: 250
    };
    this.plans = [
      {
        name: "KES 499",
        price: 499,
        data: 2,
        minutes: 500,
        sms: 250,
        type: "Bonga Zaidi"
      },
      {
        name: "KES 499",
        price: 499,
        data: 4,
        minutes: 300,
        sms: 150,
        type: "Browse Ukibonga"
      },
      {
        name: "KES 499",
        price: 499,
        data: 6,
        minutes: 200,
        sms: 100,
        type: "Browse Zaidi"
      },
      {
        name: "KES 1,499",
        price: 1499,
        data: 24,
        minutes: 1400,
        sms: 700,
        type: "Bonga Zaidi"
      },
      {
        name: "KES 1,499",
        price: 1499,
        data: 32,
        minutes: 1200,
        sms: 600,
        type: "Browse Ukibonga"
      },
      {
        name: "KES 1,499",
        price: 1499,
        data: 40,
        minutes: 800,
        sms: 400,
        type: "Browse Zaidi"
      },
      {
        name: "KES 1,999",
        price: 1999,
        data: 40,
        minutes: 2000,
        sms: 1000,
        type: "Bonga Zaidi"
      },
      {
        name: "KES 1,999",
        price: 1999,
        data: 56,
        minutes: 1600,
        sms: 800,
        type: "Browse Ukibonga"
      },
      {
        name: "KES 1,999",
        price: 1999,
        data: 72,
        minutes: 1000,
        sms: 500,
        type: "Browse Zaidi"
      },
      {
        name: "KES 2,999",
        price: 2999,
        data: 72,
        minutes: 3000,
        sms: 1500,
        type: "Bonga Zaidi"
      },
      {
        name: "KES 2,999",
        price: 2999,
        data: 96,
        minutes: 2400,
        sms: 1200,
        type: "Browse Ukibonga"
      },
      {
        name: "KES 2,999",
        price: 2999,
        data: 120,
        minutes: 1800,
        sms: 900,
        type: "Browse Zaidi"
      }
    ];
    
    this.profiles = {
      light: { data: 5, minutes: 300, sms: 150 },
      medium: { data: 15, minutes: 800, sms: 400 },
      heavy: { data: 40, minutes: 2000, sms: 1000 },
      business: { data: 80, minutes: 3000, sms: 1500 }
    };
    
    this.init();
  }
  
  init() {
    this.setupSliders();
    this.setupProfileButtons();
    this.setupProgressIndicator();
    this.updateVisualization();
  }
  
  setupSliders() {
    const dataSlider = document.getElementById('data-usage');
    const minutesSlider = document.getElementById('call-minutes');
    const smsSlider = document.getElementById('sms-count');
    
    dataSlider.addEventListener('input', (e) => {
      this.userUsage.data = parseInt(e.target.value);
      document.getElementById('data-value').textContent = `${this.userUsage.data} GB`;
      this.updateVisualization();
    });
    
    minutesSlider.addEventListener('input', (e) => {
      this.userUsage.minutes = parseInt(e.target.value);
      document.getElementById('minutes-value').textContent = this.userUsage.minutes;
      this.updateVisualization();
    });
    
    smsSlider.addEventListener('input', (e) => {
      this.userUsage.sms = parseInt(e.target.value);
      document.getElementById('sms-value').textContent = `${this.userUsage.sms} SMS`;
      this.updateVisualization();
    });
  }
  
  setupProfileButtons() {
    const profileButtons = document.querySelectorAll('.profile-btn');
    profileButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const profile = btn.dataset.profile;
        this.applyProfile(profile);
        
        // Update active state
        profileButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
  
  setupProgressIndicator() {
    const calculator = document.querySelector('.plan-calculator');
    const progressHTML = `
      <div class="calculator-progress">
        <div class="progress-step active" data-step="1">1</div>
        <div class="progress-step" data-step="2">2</div>
      </div>
    `;
    calculator.insertAdjacentHTML('afterbegin', progressHTML);
  }
  
  applyProfile(profileName) {
    const profile = this.profiles[profileName];
    if (profile) {
      this.userUsage = { ...profile };
      
      // Update sliders
      document.getElementById('data-usage').value = profile.data;
      document.getElementById('call-minutes').value = profile.minutes;
      document.getElementById('sms-count').value = profile.sms;
      
      // Update displays
      document.getElementById('data-value').textContent = `${profile.data} GB`;
      document.getElementById('minutes-value').textContent = profile.minutes;
      document.getElementById('sms-value').textContent = `${profile.sms} SMS`;
      
      this.updateVisualization();
    }
  }
  
  updateVisualization() {
    // Update data bar
    const dataBar = document.getElementById('data-bar');
    const dataPercent = Math.min((this.userUsage.data / 100) * 100, 100);
    dataBar.querySelector('.bar-fill').style.width = `${dataPercent}%`;
    dataBar.querySelector('.bar-value').textContent = `${this.userUsage.data} GB`;
    
    // Update minutes bar
    const minutesBar = document.getElementById('minutes-bar');
    const minutesPercent = Math.min((this.userUsage.minutes / 5000) * 100, 100);
    minutesBar.querySelector('.bar-fill').style.width = `${minutesPercent}%`;
    minutesBar.querySelector('.bar-value').textContent = `${this.userUsage.minutes} min`;
    
    // Update SMS bar
    const smsBar = document.getElementById('sms-bar');
    const smsPercent = Math.min((this.userUsage.sms / 2000) * 100, 100);
    smsBar.querySelector('.bar-fill').style.width = `${smsPercent}%`;
    smsBar.querySelector('.bar-value').textContent = `${this.userUsage.sms} SMS`;
  }
  
  calculateRecommendations() {
    const recommendations = this.plans.map(plan => {
      const dataScore = Math.max(0, 100 - (Math.abs(plan.data - this.userUsage.data) / this.userUsage.data) * 100);
      const minutesScore = Math.max(0, 100 - (Math.abs(plan.minutes - this.userUsage.minutes) / this.userUsage.minutes) * 100);
      const smsScore = Math.max(0, 100 - (Math.abs(plan.sms - this.userUsage.sms) / this.userUsage.sms) * 100);
      
      const overallScore = (dataScore * 0.4 + minutesScore * 0.4 + smsScore * 0.2);
      
      return {
        ...plan,
        score: overallScore,
        dataScore,
        minutesScore,
        smsScore
      };
    });
    
    // Sort by score and get top 3
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }
  
  showResults() {
    const recommendations = this.calculateRecommendations();
    const resultsContainer = document.getElementById('recommended-plans');
    const summaryContainer = document.getElementById('result-summary');
    
    // Update summary
    const bestPlan = recommendations[0];
    summaryContainer.innerHTML = `
      <div class="summary-content">
        <div class="summary-icon">🎯</div>
        <div class="summary-text">
          <strong>${bestPlan.name} - ${bestPlan.type}</strong> is your perfect match!
          <br>Matches ${Math.round(bestPlan.score)}% of your needs.
        </div>
      </div>
    `;
    
    // Update recommendations
    resultsContainer.innerHTML = recommendations.map((plan, index) => `
      <div class="plan-recommendation ${index === 0 ? 'best-match' : ''}" data-plan="${plan.name}">
        <h5>${plan.name} - ${plan.type}</h5>
        <div class="price">KES ${plan.price}<span>/month</span></div>
        
        <div class="plan-details">
          <div class="plan-detail">
            <i class="fas fa-database"></i>
            <div class="detail-value">${plan.data} GB</div>
            <div class="detail-label">Data</div>
          </div>
          <div class="plan-detail">
            <i class="fas fa-clock"></i>
            <div class="detail-value">${plan.minutes}</div>
            <div class="detail-label">Minutes</div>
          </div>
          <div class="plan-detail">
            <i class="fas fa-comment"></i>
            <div class="detail-value">${plan.sms}</div>
            <div class="detail-label">SMS</div>
          </div>
        </div>
        
        <div class="match-score">
          Match: <span>${Math.round(plan.score)}%</span>
          ${index === 0 ? '<br><strong>Perfect for your needs!</strong>' : ''}
        </div>
        
        <div class="plan-cta">
          <a href="https://wa.me/254740066232?text=I%20want%20to%20subscribe%20to%20Airtel%20${plan.name}%20Plan - ${plan.type}"
             class="btn btn-primary btn-block" target="_blank">
            Subscribe via WhatsApp
          </a>
        </div>
      </div>
    `).join('');
    
    // Add smooth transition
    resultsContainer.style.opacity = '0';
    resultsContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      resultsContainer.style.transition = 'all 0.5s ease-out';
      resultsContainer.style.opacity = '1';
      resultsContainer.style.transform = 'translateY(0)';
    }, 100);
  }
  
  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
      this.updateStep();
      this.showResults();
    }
  }
  
  updateStep() {
    // Update progress indicator
    document.querySelectorAll('.progress-step').forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.dataset.step) <= this.currentStep) {
        step.classList.add('active');
        if (parseInt(step.dataset.step) < this.currentStep) {
          step.classList.add('completed');
        }
      }
    });
    
    // Update form steps
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.dataset.step) === this.currentStep) {
        step.classList.add('active');
      }
    });
  }
}

// Global functions
function resetCalculator() {
  const calculator = new PlanCalculator();
  calculator.currentStep = 1;
  calculator.updateStep();
  
  // Reset profile buttons
  document.querySelectorAll('.profile-btn').forEach(btn => {
    btn.classList.remove('active');
  });
}

function scrollToPlans() {
  const plansSection = document.getElementById('plans');
  if (plansSection) {
    window.scrollTo({
      top: plansSection.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Initialize all scripts on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize carousel
  try {
    const carousel = new HeroCarousel();
    // Fallback: if autoplay doesn't start after 2 seconds, force it
    setTimeout(() => {
      if (!carousel.autoPlayInterval) {
        carousel.startAutoPlay();
      }
    }, 2000);
  } catch (error) {
    console.error('Error initializing carousel:', error);
  }

  // Initialize enhanced scroll animation
  const scrollAnimation = new EnhancedScrollAnimation();
  window.enhancedScrollAnimation = scrollAnimation;
  
  // Refresh on dynamic content changes
  window.addEventListener('resize', () => {
    if (window.enhancedScrollAnimation) {
      window.enhancedScrollAnimation.refresh();
    }
  });
  
  // Add smooth reveal animation for FAQ accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item, index) => {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Stagger animation for FAQ items
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Initialize parallax effect
  setupParallaxEffect();

  // Initialize benefit animations
  setupBenefitAnimations();

  // Initialize calculator
  const calculator = new PlanCalculator();
  
  // Add calculate button functionality
  const calculateBtn = document.createElement('button');
  calculateBtn.className = 'btn btn-primary btn-lg';
  calculateBtn.textContent = 'Calculate My Plan';
  calculateBtn.style.marginTop = '30px';
  calculateBtn.style.width = '100%';
  
  calculateBtn.addEventListener('click', () => {
    calculator.nextStep();
  });
  
  // Add calculate button to the form
  const formStep = document.querySelector('.form-step[data-step="1"]');
  if (formStep) {
    formStep.appendChild(calculateBtn);
  }
  
  // Store calculator instance globally
  window.planCalculator = calculator;
});