import Forms from "@/src/components/Forms";
import Header from "@/src/components/Header";

export default function NovaIndicacao() {
    return (
        <>
            <Header />
            <div className="container">
                <h1>Ciar Nova Indicação</h1>
                <Forms />
            </div>
        </>
    )
}