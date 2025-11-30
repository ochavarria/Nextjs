-- Seed Data
-- This file inserts initial data into the database
-- Run this after schema.sql

-- Profile Data
INSERT INTO profiles (locale, name, description, photo) VALUES
('en', 'Oscar Chavarria', 'Software Engineer • Law Student • Musician • Scuba Diver • Traveler', 'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/profile.jpeg'),
('es', 'Oscar Chavarria', 'Ingeniero de Software • Estudiante de Derecho • Músico • Buzo • Viajero', 'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/profile.jpeg')
ON CONFLICT (locale) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  photo = EXCLUDED.photo;

-- Social Links for English profile
INSERT INTO social_links (profile_id, platform, url, order_index)
SELECT 
  p.id,
  'email',
  'mailto:ocach14@gmail.com',
  1
FROM profiles p WHERE p.locale = 'en'
ON CONFLICT DO NOTHING;

INSERT INTO social_links (profile_id, platform, url, order_index)
SELECT 
  p.id,
  'linkedin',
  'https://www.linkedin.com/in/ochavarria/',
  2
FROM profiles p WHERE p.locale = 'en'
ON CONFLICT DO NOTHING;

INSERT INTO social_links (profile_id, platform, url, order_index)
SELECT 
  p.id,
  'github',
  'https://github.com/ochavarria',
  3
FROM profiles p WHERE p.locale = 'en'
ON CONFLICT DO NOTHING;

-- Social Links for Spanish profile
INSERT INTO social_links (profile_id, platform, url, order_index)
SELECT 
  p.id,
  'email',
  'mailto:ocach14@gmail.com',
  1
FROM profiles p WHERE p.locale = 'es'
ON CONFLICT DO NOTHING;

INSERT INTO social_links (profile_id, platform, url, order_index)
SELECT 
  p.id,
  'linkedin',
  'https://www.linkedin.com/in/ochavarria/',
  2
FROM profiles p WHERE p.locale = 'es'
ON CONFLICT DO NOTHING;

INSERT INTO social_links (profile_id, platform, url, order_index)
SELECT 
  p.id,
  'github',
  'https://github.com/ochavarria',
  3
FROM profiles p WHERE p.locale = 'es'
ON CONFLICT DO NOTHING;

-- Roles
INSERT INTO roles (slug, locale, name, is_public, order_index) VALUES
('engineer', 'en', 'Engineer', true, 1),
('law', 'en', 'Law', false, 2),
('music', 'en', 'Music', false, 3),
('diver', 'en', 'Diver', false, 4),
('traveler', 'en', 'Traveler', false, 5),
('engineer', 'es', 'Ingeniero', true, 1),
('law', 'es', 'Derecho', false, 2),
('music', 'es', 'Música', false, 3),
('diver', 'es', 'Buzo', false, 4),
('traveler', 'es', 'Viajero', false, 5)
ON CONFLICT (slug, locale) DO UPDATE SET
  name = EXCLUDED.name,
  is_public = EXCLUDED.is_public,
  order_index = EXCLUDED.order_index;

-- Experiences for Engineer role (English)
INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Lead Back-End Software Engineer',
  'Frontier Communications',
  'Mar 2024 – Present',
  '["Developed and optimized .NET microservices for product catalog APIs (voice/data/video), enabling telecom sellers to handle 288k+ daily transactions, while improving API response time by 20% through performance tuning and database query optimization.", "Directed late-night production deployments across multiple environments, ensuring consistent data integrity and 99.9% service uptime, and collaborated with business analysts to align product offerings with sales strategies.", "Automated ETL and data-loading processes via .NET SSIS pipelines, saving 10+ hours per week and reducing deployment errors by 30%, while leading 5+ new projects/features to enhance service performance and reliability.", "Implemented a Docker-based automated unit testing solution in Azure Cloud, cutting CI testing time by 40% and standardizing test environments."]'::jsonb,
  true,
  1
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Search Engine Optimization Engineer',
  'Cordova',
  'May 2023 – Aug 2024',
  '["Enhanced website performance across all SEO metrics, raising scores from 60 to 90 as measured via Lighthouse reports.", "Built and maintained web solutions using Next.js, Gatsby.js, HTML, CSS, and JavaScript for a high-traffic site with 8.1M+ monthly visits, delivering responsive and user-friendly experiences.", "Delivered on-call support for SEO-critical issues, quickly resolving incidents to preserve Lighthouse metrics, uptime, and search performance.", "Developed a shortcode-to-UI component transformation system using WordPress and Next.js, enabling content managers to create pages more efficiently with a language-based approach, reducing manual page-building time."]'::jsonb,
  true,
  2
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Full-Stack Software Engineer',
  'AKUREY',
  'Jan 2021 – Mar 2023',
  '["Delivered full-stack solutions across multiple 10+ projects with a strong focus on front-end development.", "Partnered with UX/design/QA teams to build responsive, user-centered interfaces.", "Worked with 6+ clients to implement tailored development solutions, addressing their specific business needs and improving operational efficiency."]'::jsonb,
  true,
  3
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Software Engineer',
  'Intel',
  'Jan 2018 – Jan 2021',
  '["Designed and deployed solutions using Kubernetes, Docker, and GitLab CI/CD automated pipelines.", "Developed and maintained end-to-end web solutions for 1000+ daily internal requests, ensuring seamless integration and high performance.", "Automated support processes with Python, PowerShell, and Bash, reducing manual workload and cutting issue resolution time by 60%, saving an estimated $30k+ per month in operational costs."]'::jsonb,
  true,
  4
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

-- Experiences for Engineer role (Spanish)
INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Ingeniero de Software Back-End Líder',
  'Frontier Communications',
  'Mar 2024 – Presente',
  '["Desarrollé y optimicé microservicios .NET para APIs de catálogo de productos (voz/datos/video), permitiendo a vendedores de telecomunicaciones manejar más de 288k transacciones diarias, mientras mejoraba el tiempo de respuesta de la API en un 20% mediante ajustes de rendimiento y optimización de consultas de base de datos.", "Dirigí despliegues de producción nocturnos en múltiples entornos, asegurando integridad de datos consistente y 99.9% de tiempo de actividad del servicio, y colaboré con analistas de negocio para alinear ofertas de productos con estrategias de ventas.", "Automaticé procesos ETL y de carga de datos mediante pipelines .NET SSIS, ahorrando más de 10 horas por semana y reduciendo errores de despliegue en un 30%, mientras lideraba más de 5 proyectos/características nuevas para mejorar el rendimiento y confiabilidad del servicio.", "Implementé una solución automatizada de pruebas unitarias basada en Docker en Azure Cloud, reduciendo el tiempo de pruebas CI en un 40% y estandarizando entornos de prueba."]'::jsonb,
  true,
  1
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Ingeniero de Optimización de Motores de Búsqueda',
  'Cordova',
  'May 2023 – Ago 2024',
  '["Mejoré el rendimiento del sitio web en todas las métricas SEO, elevando las puntuaciones de 60 a 90 según se midió mediante informes Lighthouse.", "Construí y mantuve soluciones web usando Next.js, Gatsby.js, HTML, CSS y JavaScript para un sitio de alto tráfico con más de 8.1M visitas mensuales, entregando experiencias responsivas y fáciles de usar.", "Proporcioné soporte on-call para problemas críticos de SEO, resolviendo rápidamente incidentes para preservar métricas Lighthouse, tiempo de actividad y rendimiento de búsqueda.", "Desarrollé un sistema de transformación de shortcode a componente UI usando WordPress y Next.js, permitiendo a los gestores de contenido crear páginas de manera más eficiente con un enfoque basado en lenguaje, reduciendo el tiempo de construcción manual de páginas."]'::jsonb,
  true,
  2
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Ingeniero de Software Full-Stack',
  'AKUREY',
  'Ene 2021 – Mar 2023',
  '["Entregué soluciones full-stack en más de 10 proyectos múltiples con un fuerte enfoque en desarrollo front-end.", "Colaboré con equipos de UX/diseño/QA para construir interfaces responsivas centradas en el usuario.", "Trabajé con más de 6 clientes para implementar soluciones de desarrollo personalizadas, abordando sus necesidades comerciales específicas y mejorando la eficiencia operativa."]'::jsonb,
  true,
  3
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

INSERT INTO experiences (role_id, locale, title, company, period, description, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Ingeniero de Software',
  'Intel',
  'Ene 2018 – Ene 2021',
  '["Diseñé y desplegué soluciones usando Kubernetes, Docker y pipelines automatizados GitLab CI/CD.", "Desarrollé y mantuve soluciones web de extremo a extremo para más de 1000 solicitudes internas diarias, asegurando integración fluida y alto rendimiento.", "Automaticé procesos de soporte con Python, PowerShell y Bash, reduciendo la carga de trabajo manual y cortando el tiempo de resolución de problemas en un 60%, ahorrando un estimado de más de $30k por mes en costos operativos."]'::jsonb,
  true,
  4
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

-- Projects for Engineer role (English)
INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Online learning platform',
  'edX',
  'edX is a global online-learning platform created by MIT and Harvard, offering university-level courses and professional programs across a wide range of disciplines. It''s widely used for skill development, career advancement, and continuing education.',
  'Senior Frontend Engineer specializing in SEO and platform modernization. I led key initiatives to improve the platform''s technical search performance and played a central role in the migration of core applications to Next.js. This included implementing modern rendering strategies, optimizing critical user flows, and shaping architectural decisions that elevated site performance, scalability, and long-term maintainability. I collaborated closely with product, content, and infrastructure teams to ensure SEO integrity during large-scale changes and to deliver a faster, more resilient experience to millions of learners worldwide.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/edx.jpeg',
  'https://www.edx.org/',
  NULL,
  NULL,
  NULL,
  true,
  1
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Microsoft Surface',
  'Microsoft',
  'An interactive 3D web experience designed to showcase Microsoft Surface products through an immersive, playground-style interface. The application featured real-time 3D models and dynamic interactions, allowing users to explore device features in a visually engaging and intuitive way.',
  'Frontend Engineer contributing to the development of advanced 3D product visualizations using Three.js. Despite having no prior experience with Three.js, I rapidly upskilled to implement new interactive experiences, refine existing 3D scenes, and resolve complex rendering and performance issues. I collaborated closely with designers and technical leads to enhance realism, stability, and user engagement, helping elevate the overall quality of the product showcase.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/microsoft.jpg',
  'https://www.microsoft.com/en-us/surface/devices/surface-laptop',
  NULL,
  NULL,
  NULL,
  true,
  2
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Online learning platform',
  'Honor Education',
  'Honor Education is a modern digital-learning platform designed to transform online education through social, collaborative, and AI-enhanced learning. The platform enables universities, companies, and training organizations to create immersive courses enriched with real-time discussions, community engagement tools, and intelligent content-building features. It focuses on delivering deeply interactive learning experiences rather than traditional passive course delivery, providing a scalable and highly customizable system for course creators and learners.',
  'Full-Stack Engineer responsible for building and evolving the platform''s internal course-creation tools. I contributed end-to-end development of the Admin Site—used by educators, institutions, and instructional designers to design, structure, and publish learning experiences. Over time, I became the primary owner of the application, driving architectural decisions, feature development, performance improvements, and long-term technical strategy. My work enabled course creators to rapidly build and manage complex learning pathways, integrating collaborative features, AI-assisted workflows, and real-time feedback mechanisms. I partnered closely with product, design, and leadership to ensure the toolset met enterprise-level standards for usability, stability, and scalability.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/honored.jpeg',
  'https://www.honor.education/',
  NULL,
  NULL,
  NULL,
  true,
  3
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Help finder platform',
  'Caregiving',
  'Caregiving.com is an online community and resource hub that supports family caregivers through educational content, shared stories, and emotional guidance. The platform connects caregivers with tools and experiences that help them manage the challenges of supporting aging or ill loved ones.',
  'Frontend Engineer responsible for enhancing and maintaining the platform''s user experience. I implemented interface improvements, optimized performance, resolved complex UI issues, and collaborated closely with design and product teams to ensure the platform remained accessible, stable, and user-friendly for a highly supportive community.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/caregiver.jpg',
  'https://www.caregiving.com/',
  NULL,
  NULL,
  NULL,
  true,
  4
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'en',
  'Fan Zone',
  'Seattle Kraken',
  'The Seattle Kraken Fan Zone is the official digital platform for the NHL team, delivering real-time game updates, team news, ticketing tools, schedules, fan content, and integrations with the team''s mobile app. It serves as a central hub for fan engagement and game-day interaction.',
  'Frontend Engineer leading the development of the platform from the ground up. I worked end-to-end on the project—from architecture and component design to deployment—ensuring high performance, accessibility, and reliability for a large, active fanbase. I built core UI features, integrated live data, and delivered a polished, production-ready experience aligned with an internationally recognized sports brand.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/kraken.png',
  'https://www.nhl.com/kraken/fans/',
  NULL,
  NULL,
  NULL,
  true,
  5
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'en';

-- Projects for Engineer role (Spanish)
INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Plataforma de aprendizaje en línea',
  'edX',
  'edX es una plataforma global de aprendizaje en línea creada por MIT y Harvard, que ofrece cursos universitarios y programas profesionales en una amplia gama de disciplinas. Es ampliamente utilizada para el desarrollo de habilidades, el avance profesional y la educación continua.',
  'Ingeniero Frontend Senior especializado en SEO y modernización de plataformas. Lideré iniciativas clave para mejorar el rendimiento técnico de búsqueda de la plataforma y desempeñé un papel central en la migración de aplicaciones principales a Next.js. Esto incluyó la implementación de estrategias de renderizado modernas, la optimización de flujos de usuario críticos y la toma de decisiones arquitectónicas que elevaron el rendimiento del sitio, la escalabilidad y la mantenibilidad a largo plazo. Colaboré estrechamente con equipos de producto, contenido e infraestructura para garantizar la integridad del SEO durante cambios a gran escala y entregar una experiencia más rápida y resiliente a millones de estudiantes en todo el mundo.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/edx.jpeg',
  'https://www.edx.org/',
  NULL,
  NULL,
  NULL,
  true,
  1
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Microsoft Surface',
  'Microsoft',
  'Una experiencia web 3D interactiva diseñada para mostrar los productos Microsoft Surface a través de una interfaz inmersiva estilo playground. La aplicación presentaba modelos 3D en tiempo real e interacciones dinámicas, permitiendo a los usuarios explorar las características de los dispositivos de una manera visualmente atractiva e intuitiva.',
  'Ingeniero Frontend que contribuyó al desarrollo de visualizaciones avanzadas de productos 3D usando Three.js. A pesar de no tener experiencia previa con Three.js, me capacité rápidamente para implementar nuevas experiencias interactivas, refinar escenas 3D existentes y resolver problemas complejos de renderizado y rendimiento. Colaboré estrechamente con diseñadores y líderes técnicos para mejorar el realismo, la estabilidad y la participación del usuario, ayudando a elevar la calidad general de la exhibición del producto.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/microsoft.jpg',
  'https://www.microsoft.com/en-us/surface/devices/surface-laptop',
  NULL,
  NULL,
  NULL,
  true,
  2
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Plataforma de aprendizaje en línea',
  'Honor Education',
  'Honor Education es una plataforma moderna de aprendizaje digital diseñada para transformar la educación en línea a través del aprendizaje social, colaborativo y mejorado con IA. La plataforma permite a universidades, empresas y organizaciones de capacitación crear cursos inmersivos enriquecidos con discusiones en tiempo real, herramientas de participación comunitaria y funciones inteligentes de creación de contenido. Se enfoca en brindar experiencias de aprendizaje profundamente interactivas en lugar de la entrega tradicional de cursos pasivos, proporcionando un sistema escalable y altamente personalizable para creadores de cursos y estudiantes.',
  'Ingeniero Full-Stack responsable de construir y evolucionar las herramientas internas de creación de cursos de la plataforma. Contribuí al desarrollo de extremo a extremo del Admin Site, utilizado por educadores, instituciones y diseñadores instruccionales para diseñar, estructurar y publicar experiencias de aprendizaje. Con el tiempo, me convertí en el propietario principal de la aplicación, impulsando decisiones arquitectónicas, desarrollo de características, mejoras de rendimiento y estrategia técnica a largo plazo. Mi trabajo permitió a los creadores de cursos construir y gestionar rápidamente vías de aprendizaje complejas, integrando características colaborativas, flujos de trabajo asistidos por IA y mecanismos de retroalimentación en tiempo real. Me asocié estrechamente con producto, diseño y liderazgo para asegurar que el conjunto de herramientas cumpliera con estándares de nivel empresarial para usabilidad, estabilidad y escalabilidad.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/honored.jpeg',
  'https://www.honor.education/',
  NULL,
  NULL,
  NULL,
  true,
  3
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Plataforma de búsqueda de ayuda',
  'Caregiving',
  'Caregiving.com es una comunidad en línea y centro de recursos que apoya a los cuidadores familiares a través de contenido educativo, historias compartidas y orientación emocional. La plataforma conecta a los cuidadores con herramientas y experiencias que les ayudan a manejar los desafíos de apoyar a seres queridos que envejecen o están enfermos.',
  'Ingeniero Frontend responsable de mejorar y mantener la experiencia del usuario de la plataforma. Implementé mejoras en la interfaz, optimicé el rendimiento, resolví problemas complejos de UI y colaboré estrechamente con equipos de diseño y producto para asegurar que la plataforma permaneciera accesible, estable y fácil de usar para una comunidad altamente solidaria.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/caregiver.jpg',
  'https://www.caregiving.com/',
  NULL,
  NULL,
  NULL,
  true,
  4
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';

INSERT INTO projects (role_id, locale, title, company, description, contribution, photo, url, github_url, technologies, period, is_public, order_index)
SELECT 
  r.id,
  'es',
  'Zona de Fanáticos',
  'Seattle Kraken',
  'La Zona de Fanáticos de Seattle Kraken es la plataforma digital oficial del equipo de la NHL, que ofrece actualizaciones de juegos en tiempo real, noticias del equipo, herramientas de boletos, horarios, contenido para fanáticos e integraciones con la aplicación móvil del equipo. Sirve como un centro central para la participación de los fanáticos y la interacción del día del juego.',
  'Ingeniero Frontend que lideró el desarrollo de la plataforma desde cero. Trabajé de extremo a extremo en el proyecto, desde la arquitectura y el diseño de componentes hasta el despliegue, asegurando alto rendimiento, accesibilidad y confiabilidad para una gran base de fanáticos activa. Construí características principales de UI, integré datos en vivo y entregué una experiencia pulida y lista para producción alineada con una marca deportiva reconocida internacionalmente.',
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/cv-images/kraken.png',
  'https://www.nhl.com/kraken/fans/',
  NULL,
  NULL,
  NULL,
  true,
  5
FROM roles r WHERE r.slug = 'engineer' AND r.locale = 'es';
