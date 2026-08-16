import PageIntro from "@/components/sections/shared/PageIntro";

const ServicesIntro = () => {
	return (
		<PageIntro
			subtitle="ICT Services"
			title="Smart IT solutions for modern"
			highlight="businesses."
			image="/images/service/service-5.webp"
			imageAlt="ICT technicians supporting business systems"
		>
			<p>
				At Techlink Limited, we provide reliable, secure, and scalable ICT
				solutions designed to help businesses run smarter and grow faster.
				Whether you are a startup setting up your first IT infrastructure or an
				established organization upgrading your systems, we deliver technology
				that works for you.
			</p>
			<p>
				Our services cover end-to-end ICT support, including network design and
				installation, hardware and software supply, system maintenance,
				cybersecurity, cloud services, and ongoing technical support. We take
				time to understand your business needs, then tailor solutions that
				improve efficiency, security, and performance. We do not just fix
				problems — we help prevent them.
			</p>
		</PageIntro>
	);
};

export default ServicesIntro;
