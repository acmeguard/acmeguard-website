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
                    <h2>Book Your AcmeGuard Demo</h2>
                    <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">
                        See how AcmeGuard can centralize your ACME protocol usage and secure private infrastructure. 
                        Schedule a demo directly, send us your information, or email us at <a href="mailto:sales@acmeguard.io" style="color: var(--primary);">sales@acmeguard.io</a>.
                    </p>
                    
                    <form id="demo-form" onsubmit="acmeGuardDemo.submitDemoForm(event)">
                        <div class="form-group">
                            <label class="form-label" for="name">Full Name *</label>
                            <input class="form-input" type="text" id="name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="email">Work Email *</label>
                            <input class="form-input" type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="company">Company Name *</label>
                            <input class="form-input" type="text" id="company" name="company" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="role">Job Title</label>
                            <input class="form-input" type="text" id="role" name="role" placeholder="e.g., IT Manager, Security Engineer">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="company-size">Company Size</label>
                            <select class="form-select" id="company-size" name="company-size">
                                <option value="">Select...</option>
                                <option value="1-50">1-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-1000">201-1000 employees</option>
                                <option value="1000+">1000+ employees</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="use-case">Primary Use Case</label>
                            <select class="form-select" id="use-case" name="use-case">
                                <option value="">Select...</option>
                                <option value="acme-governance">ACME protocol governance & control</option>
                                <option value="private-network">Secure private infrastructure</option>
                                <option value="cost-effective">Cost-effective ACME management</option>
                                <option value="compliance">Enterprise compliance & governance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="current-solution">Current Certificate Management</label>
                            <textarea class="form-textarea" id="current-solution" name="current-solution" 
                                placeholder="Tell us about your current certificate management approach (optional)"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="message">Additional Information</label>
                            <textarea class="form-textarea" id="message" name="message" 
                                placeholder="Any specific questions or requirements? (optional)"></textarea>
                        </div>
                        
                        <div style="display: flex; gap: var(--space-md); justify-content: flex-end; margin-top: var(--space-xl);">
                            <button type="button" class="btn btn-secondary" onclick="acmeGuardDemo.closeDemoModal()">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i data-lucide="send"></i>
                                Send Information
                            </button>
                            <a href="https://calendly.com/juanfontalonso/acmeguard-demo" target="_blank" class="btn btn-primary" style="text-decoration: none;">
                                <i data-lucide="calendar"></i>
                                Schedule Demo Now
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
                        <div style="width: 80px; height: 80px; background: var(--accent); border-radius: 50%; 
                                    display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg);">
                            <i data-lucide="check" style="width: 40px; height: 40px; color: white;"></i>
                        </div>
                        <h2 style="color: var(--accent); margin-bottom: var(--space-md);">Demo Request Received!</h2>
                        <p style="color: var(--text-secondary); font-size: 1.1rem;">
                            Thank you, ${data.name}! We've received your demo request for <strong>${data.company}</strong>.
                        </p>
                    </div>
                    
                    <div style="background: var(--surface); padding: var(--space-xl); border-radius: 0.75rem; margin-bottom: var(--space-xl);">
                        <h3 style="margin-bottom: var(--space-md);">What's Next?</h3>
                                                 <ul style="text-align: left; color: var(--text-secondary); list-style: none;">
                             <li style="padding: var(--space-sm) 0; position: relative; padding-left: var(--space-lg);">
                                 <span style="position: absolute; left: 0; color: var(--accent); font-weight: 600;">1.</span>
                                 Our team will review your requirements
                             </li>
                             <li style="padding: var(--space-sm) 0; position: relative; padding-left: var(--space-lg);">
                                 <span style="position: absolute; left: 0; color: var(--accent); font-weight: 600;">2.</span>
                                 We'll reach out within 24 hours to schedule your demo
                             </li>
                             <li style="padding: var(--space-sm) 0; position: relative; padding-left: var(--space-lg);">
                                 <span style="position: absolute; left: 0; color: var(--accent); font-weight: 600;">3.</span>
                                 Or <a href="https://calendly.com/acmeguard/acmeguard-demo" target="_blank" style="color: var(--primary);">schedule directly</a> or email <a href="mailto:sales@acmeguard.io" style="color: var(--primary);">sales@acmeguard.io</a>
                             </li>
                         </ul>
                    </div>
                    
                    <div>
                        <button class="btn btn-primary" onclick="acmeGuardDemo.closeDemoModal()">
                            <i data-lucide="thumbs-up"></i>
                            Got it, thanks!
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
                        <div style="width: 80px; height: 80px; background: var(--danger); border-radius: 50%; 
                                    display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-lg);">
                            <i data-lucide="x" style="width: 40px; height: 40px; color: white;"></i>
                        </div>
                        <h2 style="color: var(--danger); margin-bottom: var(--space-md);">Something went wrong</h2>
                        <p style="color: var(--text-secondary);">
                            We couldn't submit your demo request. Please try again or contact us directly.
                        </p>
                    </div>
                    
                    <div style="display: flex; gap: var(--space-md); justify-content: center;">
                        <button class="btn btn-secondary" onclick="acmeGuardDemo.showDemoModal()">
                            <i data-lucide="rotate-ccw"></i>
                            Try Again
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