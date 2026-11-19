import { getImagePath, highlightLastWords } from "./utils.js";

// Hero
function renderHero(hero) {
  const heroContainer = document.querySelector("#hero");
  heroContainer.innerHTML = `
        <img src="${getImagePath(hero.image)}" alt="${hero.title}">
            <div class="heroTextContainer">
            <h1>${highlightLastWords(hero.title)}</h1>
            <p>${hero.subtitle}</p>
            </div>
  `;
}

//Summary
function renderSummary(summary) {
  const summaryContainer = document.querySelector("#summary");
  summaryContainer.innerHTML = `
     ${summary
       .map(
         (item) => `
                <div class="summary-card ${item.highlighted ? "highlighted" : ""}">
                    <h2 class="gradient-text">${item.value}</h2>
                    <p>${item.label}</p>
                </div>
            `,
       )
       .join("")}

`;
}

//Register
function renderRegister(register, ui) {
  const registerContainer = document.querySelector("#register");

  registerContainer.innerHTML = `
      <h2>${ui.sections.register}${register.title}</h2>

      <div class="register-container">
        <div class="register-image">
          <img src="${getImagePath(register.image)}" alt="${register.game}">
        </div>

        <div class="register-content">
       
        <p class="register-description"> ${register.text}</p>

          <div class="register-reward">
            <span class="reward-amount gradient-text">${register.freespins}</span>

            <div class="reward-details">
              <span class="reward-type">${ui.rewardType}</span>
              <span class="reward-game">${register.game}</span>
            </div>
          </div>

          <button class="register-button">${register.button}</button>
        </div>
      </div>
  `;
}

//Deposit
function renderDeposit(deposit, ui) {
  const labels = ui.deposit;

  const depositContainer = document.querySelector("#deposit");
  depositContainer.innerHTML = `
  <h2>${ui.sections.deposit} ${deposit.title}</h2>

      <div class="deposit-container">
        <p class="deposit-description">${deposit.text}</p>

        <div class="deposit-content">
          <div class="deposit-reward">
            <span class="deposit-amount gradient-text">${deposit.freespins}</span>

            <div class="deposit-details">
              <span class="deposit-type">${ui.rewardType}</span>
              <span class="deposit-game">${deposit.game}</span>
            </div>
          </div>

          <button class="deposit-button">${deposit.button}
          <svg width="20" height="20" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="19" fill="white" />
          <path  d="M20 12V28 M12 20H28"  stroke="#07912B" stroke-width="5" stroke-linecap="round" />
          </svg>
          </button>
        </div>

        <div class="tiers">
          <div class="tier-row tier-header">
            <span>${labels.tierDeposit}</span>
            <span>${labels.tierReward}</span>
          </div>

         ${deposit.tiers
           .map(
             (tier, index) => `
             <div class="tier-row">
               <span>
                    ${
                      tier.to !== null
                        ? `${tier.from} - ${tier.to} ${labels.currency}`
                        : `${tier.from} ${labels.openEnded}`
                    }
               </span>

              <span>
                <span class="${index === deposit.tiers.length - 1 ? "gradient-text" : ""}">
                 ${tier.freespins} ${labels.freespinSuffix}
                </span>
              </span>
          </div> `,
           )
           .join("")}
        </div>
      </div>
  `;
}

// Missions
function renderMissions(missions, ui) {
  const labels = ui.missions;
  const maxAmount = Math.max(...missions.milestones.map((m) => m.amount));
  const currentProgress = missions.progress.current;
  const progressPercent = Math.min((currentProgress / maxAmount) * 100, 100);

  const missionsContainer = document.querySelector("#missions");
  missionsContainer.innerHTML = `
      <h2>
        ${ui.sections.missions}
        <span class="desktop-text">${missions.title}</span>
        <span class="mobile-text">${labels.mobileTitle}</span>
      </h2>

      <div class="missions-container">
        <div class="missions-description">${highlightLastWords(missions.text)}</div>

        <div class="missions-countdown">
          <span class="countdown-title">${ui.countdown.title}</span>
          <div class="countdown">
            <div class="countdown-numbers"></div>
            <p class="countdown-status"></p>
          </div>
        </div>

        <div class="mission-progress-wrapper">
          <div class="progress-row-top">
            <span class="progress-label-title">${labels.progressLabel}</span>

            <div class="milestones-top-scale">
              ${missions.milestones
                .map((item) => {
                  const posPercent = (item.amount / maxAmount) * 100;

                  return `
                    <div class="scale-marker" style="left: ${posPercent}%">
                      <span class="marker-amount">${item.amount}${missions.progress.currency}</span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>

          <div class="custom-progress-bar">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>

            <div class="progress-thumb" style="left: ${progressPercent}%">
              <span>+${currentProgress}${missions.progress.currency}</span>
            </div>
          </div>

          <div class="progress-row-bottom">
            <span class="progress-label-title">${labels.rewardLabel}</span>

            <div class="milestones-bottom-rewards">
              ${missions.milestones
                .map((item) => {
                  const posPercent = (item.amount / maxAmount) * 100;

                  return `
                    <div class="reward-marker" style="left: ${posPercent}%">
                      <span class="reward-value gradient-text">
                        ${item.reward}
                        <img src="${getImagePath(item.rewardIcon)}" alt="">
                      </span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        </div>

        <div class="slots">
          ${missions.slots
            .map(
              (slot) => `
                <div class="slot-card">
                  <img src="${getImagePath(slot.image)}" alt="${slot.name}">
                  <span class="slot-title">${slot.name}</span>
                </div>
              `,
            )
            .join("")}
        </div>

        <button
          class="missions-button"
          onclick="
            const container = this.parentElement;
            container.classList.toggle('active');
            const isOpen = container.classList.contains('active');

            this.querySelector('.desktop-text').textContent =
              isOpen ? '${labels.closeButton}' : '${missions.button}';

            this.querySelector('.mobile-text').textContent =
              isOpen ? '${labels.closeButton}' : '${labels.mobileButton}';
          "
        >
          <span class="desktop-text">${missions.button}</span>
          <span class="mobile-text">${labels.mobileButton}</span>
        </button>
      </div>
  `;
}

// Rules
function renderRules(rules, labels) {
  const rulesContainer = document.querySelector("#rules");
  rulesContainer.innerHTML = `
   <h2 class="rules-heading">${labels.title}</h2>

      <div class="rules-list">
        ${rules
          .map(
            (rule) => `
              <div class="rule-item">
                <div class="rule-header" onclick="this.parentElement.classList.toggle('active')">
                  <h3>${rule.title}</h3>

                  <svg
                    class="rule-chevron"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                <div class="rule-body">
                  <div class="rule-body-inner">
                    <p>${rule.body}</p>
                  </div>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
  `;
}

// Countdown
export function startCountdown(endsAt, labels) {
  const countdown = document.querySelector(".countdown");
  const numbers = countdown.querySelector(".countdown-numbers");
  const status = countdown.querySelector(".countdown-status");

  let interval;

  function updateCountdown() {
    const difference = new Date(endsAt).getTime() - Date.now();

    if (difference <= 0) {
      numbers.textContent = "";
      status.textContent = labels.finished;
      clearInterval(interval);
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const values = [
      { value: days, label: labels.days },
      { value: hours, label: labels.hours },
      { value: minutes, label: labels.minutes },
      { value: seconds, label: labels.seconds },
    ];

    numbers.innerHTML = values
      .map(
        (item, index) => `
          <div class="countdown-item">
            <div>
              ${String(item.value).padStart(2, "0")}
              <span>${item.label}</span>
            </div>
          </div>

          ${index < values.length - 1 ? '<span class="countdown-separator">:</span>' : ""}
        `,
      )
      .join("");

    status.textContent = "";
  }

  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
}

//Whole page (renders everything)
export function renderCampaign(data) {
  const { hero, summary, register, deposit, missions, rules, ui } = data;

  renderHero(hero);
  renderSummary(summary);
  renderRegister(register, ui);
  renderDeposit(deposit, ui);
  renderMissions(missions, ui);
  renderRules(rules, data.ui.rules);
}
