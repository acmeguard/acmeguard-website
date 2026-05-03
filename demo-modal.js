// Demo Modal and HTMX Endpoints
class AcmeGuardDemo {
    constructor() {
        this.initHTMXEndpoints();
    }

    initHTMXEndpoints() {
        // Listen for HTMX requests
        document.addEventListener('htmx:beforeRequest', (event) => {
            const url = event.detail.requestConfig.url;

            if (url === '/demo-modal') {
                event.preventDefault();
                this.showDemoModal();
            }
        });

        // Close modal on overlay click
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal')) {
                this.closeDemoModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeDemoModal();
            }
        });
    }

    showDemoModal() {
        const modalHTML = `
            <div class="modal fade-in">
                <div class="modal-content">
                    <button class="modal-close" onclick="acmeGuardDemo.closeDemoModal()">&times;</button>
                    <h2>Book a demo</h2>
                    <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">
                        Twenty minutes, your domains, no slide deck. Pick a slot directly,
                        send us your details, or email <a href="mailto:sales@acmeguard.io" style="color: var(--primary);">sales@acmeguard.io</a>.
                    </p>

                    <form id="demo-form" onsubmit="acmeGuardDemo.submitDemoForm(event)">
                        <div class="form-group">
                            <label class="form-label" for="name">Full name *</label>
                            <input class="form-input" type="text" id="name" name="name" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="email">Work email *</label>
                            <input class="form-input" type="email" id="email" name="email" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="company">Company *</label>
                            <input class="form-input" type="text" id="company" name="company" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="role">Role</label>
                            <input class="form-input" type="text" id="role" name="role" placeholder="e.g. IT manager, security engineer">
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="company-size">Company size</label>
                            <select class="form-select" id="company-size" name="company-size">
                                <option value="">Select…</option>
                                <option value="1-50">1–50 employees</option>
                                <option value="51-200">51–200 employees</option>
                                <option value="201-1000">201–1,000 employees</option>
                                <option value="1000+">1,000+ employees</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="use-case">Primary use case</label>
                            <select class="form-select" id="use-case" name="use-case">
                                <option value="">Select…</option>
                                <option value="acme-governance">ACME governance &amp; control</option>
                                <option value="private-network">Secure private infrastructure</option>
                                <option value="cost-effective">Cost-effective ACME management</option>
                                <option value="compliance">Compliance &amp; audit reporting</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="current-solution">Current setup</label>
                            <textarea class="form-textarea" id="current-solution" name="current-solution"
                                placeholder="How are you managing certificates today? (optional)"></textarea>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="message">Anything else</label>
                            <textarea class="form-textarea" id="message" name="message"
                                placeholder="Specific questions or requirements? (optional)"></textarea>
                        </div>

                        <div style="display: flex; gap: var(--space-md); justify-content: flex-end; margin-top: var(--space-xl);">
                            <button type="button" class="btn btn-secondary" onclick="acmeGuardDemo.closeDemoModal()">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i data-lucide="send"></i>
                                Send details
                            </button>
                            <a href="https://calendly.com/juanfontalonso/acmeguard-demo" target="_blank" class="btn btn-primary" style="text-decoration: none;">
                                <i data-lucide="calendar"></i>
                                Pick a time
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = modalHTML;

        // Initialize Lucide icons in the modal
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }

    closeDemoModal() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = '';
    }

    async submitDemoForm(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<i data-lucide="loader-2" style="animation: spin 1s linear infinite;"></i> Submitting...';
        submitButton.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateAPICall(data);

            // Show success message
            this.showSuccessMessage(data);

        } catch (error) {
            console.error('Demo request failed:', error);
            this.showErrorMessage();

            // Restore button
            submitButton.innerHTML = originalHTML;
            submitButton.disabled = false;
        }

        // Re-initialize icons
        lucide.createIcons();
    }

    async simulateAPICall(data) {
        // This simulates an API call - replace with your actual endpoint
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Log the form data for now (replace with actual API call)
                console.log('Demo request data:', data);

                // Send to your actual endpoint here
                // fetch('/api/demo-request', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data)
                // });

                resolve();
            }, 1500);
        });
    }

    showSuccessMessage(data) {
        const successHTML = `
            <div class="modal fade-in">
                <div class="modal-content text-center">
                    <button class="modal-close" onclick="acmeGuardDemo.closeDemoModal()">&times;</button>

                    <div style="margin-bottom: var(--space-xl);">
                        <div style="width: 44px; height: 44px; background: color-mix(in oklch, var(--success) 14%, transparent); border: 1px solid color-mix(in oklch, var(--success) 30%, transparent); border-radius: var(--radius-sm);
                                    display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg); color: var(--success);">
                            <i data-lucide="check" style="width: 22px; height: 22px;"></i>
                        </div>
                        <h2 style="margin-bottom: var(--space-md);">Got it. Thanks, ${data.name}.</h2>
                        <p style="color: var(--text-secondary); font-size: 1rem;">
                            Your details for <strong>${data.company}</strong> are with us.
                        </p>
                    </div>

                    <div style="background: var(--surface); padding: var(--space-xl); border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: var(--space-xl); text-align: left;">
                        <p class="eyebrow">What happens next</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: var(--space-xs) 0; position: relative; padding-left: var(--space-lg); color: var(--text-primary);">
                                <span style="position: absolute; left: 0; color: var(--primary); font-family: var(--font-mono); font-weight: 600;">›</span>
                                We review your details and use case
                            </li>
                            <li style="padding: var(--space-xs) 0; position: relative; padding-left: var(--space-lg); color: var(--text-primary);">
                                <span style="position: absolute; left: 0; color: var(--primary); font-family: var(--font-mono); font-weight: 600;">›</span>
                                We reach out within 24 hours to find a slot
                            </li>
                            <li style="padding: var(--space-xs) 0; position: relative; padding-left: var(--space-lg); color: var(--text-primary);">
                                <span style="position: absolute; left: 0; color: var(--primary); font-family: var(--font-mono); font-weight: 600;">›</span>
                                Or <a href="https://calendly.com/acmeguard/acmeguard-demo" target="_blank" style="color: var(--primary);">pick a time directly</a> or email <a href="mailto:sales@acmeguard.io" style="color: var(--primary);">sales@acmeguard.io</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <button class="btn btn-primary" onclick="acmeGuardDemo.closeDemoModal()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = successHTML;
    }

    showErrorMessage() {
        const errorHTML = `
            <div class="modal fade-in">
                <div class="modal-content text-center">
                    <button class="modal-close" onclick="acmeGuardDemo.closeDemoModal()">&times;</button>

                    <div style="margin-bottom: var(--space-xl);">
                        <div style="width: 44px; height: 44px; background: color-mix(in oklch, var(--danger) 14%, transparent); border: 1px solid color-mix(in oklch, var(--danger) 30%, transparent); border-radius: var(--radius-sm);
                                    display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg); color: var(--danger);">
                            <i data-lucide="x" style="width: 22px; height: 22px;"></i>
                        </div>
                        <h2 style="margin-bottom: var(--space-md);">Something went wrong</h2>
                        <p style="color: var(--text-secondary);">
                            We couldn't submit your details. Try again, or email <a href="mailto:sales@acmeguard.io" style="color: var(--primary);">sales@acmeguard.io</a>.
                        </p>
                    </div>

                    <div style="display: flex; gap: var(--space-md); justify-content: center;">
                        <button class="btn btn-secondary" onclick="acmeGuardDemo.showDemoModal()">
                            <i data-lucide="rotate-ccw"></i>
                            Try again
                        </button>
                        <button class="btn btn-primary" onclick="acmeGuardDemo.closeDemoModal()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = errorHTML;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.acmeGuardDemo = new AcmeGuardDemo();
});

// CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style); 