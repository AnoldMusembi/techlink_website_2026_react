const CONTACT_ENDPOINT = "/contact-mail.php";

/**
 * POST contact form fields to the cPanel PHP mail handler.
 * @param {{ name: string, email: string, phone: string, inquiry: string, message: string }} payload
 */
export async function submitContactForm(payload) {
	const body = {
		name: (payload.name || "").trim(),
		email: (payload.email || "").trim(),
		phone: (payload.phone || "").trim(),
		inquiry: (payload.inquiry || "").trim(),
		message: (payload.message || "").trim(),
		company_website: payload.company_website || "",
	};

	if (!body.name) {
		return { ok: false, error: "Please enter your full name." };
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
		return { ok: false, error: "Please enter a valid email address." };
	}
	if (!body.phone) {
		return { ok: false, error: "Please enter a phone number." };
	}
	if (
		!body.inquiry ||
		body.inquiry === "0" ||
		body.inquiry === "Your inquiry about"
	) {
		return { ok: false, error: "Please select what your inquiry is about." };
	}
	if (!body.message) {
		return { ok: false, error: "Please enter a message." };
	}

	try {
		const res = await fetch(CONTACT_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body),
		});

		let data = null;
		try {
			data = await res.json();
		} catch {
			data = null;
		}

		if (!res.ok || !data?.ok) {
			return {
				ok: false,
				error:
					data?.error ||
					"Unable to send your message right now. Please try again or email info@techlinklimited.co.ke.",
			};
		}

		return { ok: true, message: data.message || "Thank you. Your message has been sent." };
	} catch {
		return {
			ok: false,
			error:
				"Could not reach the mail server. On the live site this uses contact-mail.php — please email info@techlinklimited.co.ke if this continues.",
		};
	}
}

export const CONTACT_INQUIRY_OPTIONS = [
	{ value: "0", optionName: "Your inquiry about" },
	{ value: "General Information Request", optionName: "General Information Request" },
	{ value: "Partner Relations", optionName: "Partner Relations" },
	{ value: "Careers", optionName: "Careers" },
	{ value: "Software Licensing", optionName: "Software Licensing" },
];
