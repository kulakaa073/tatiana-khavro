import Container from "../../shared/container/Container";

const services = [
    {
        description: "Выявим глубинные сценарии, которые незаметно саботируют деньги, проявленность и рост",
    },
    {
        description: "Выявим глубинные сценарии, которые незаметно саботируют деньги, проявленность и ростПосмотрим, какие внутренние установки удерживают вас в повторяющихся ситуациях",
    },
    {
        description: "Найдём, где решения принимаются не из реальности, а из старых программ и страхов",
    },
    {
        description: "Поймём, что именно сейчас мешает выйти на новый уровень — в доходе и жизни",
    },
];

export default function Services() {
    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service, index) => (
                    <div key={index}>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </Container>
    );
}