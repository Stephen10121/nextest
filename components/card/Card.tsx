import styles from "./Card.module.css";

type CardStyles = {
    gradient?: string;
    spacing?: string;
    outerRadius?: string;
    innerRadius?: string;
    outerWidth?: string;
    outerHeight?: string;
    children: any;
}

const Card = ({ gradient, spacing, outerRadius, innerRadius, outerWidth, outerHeight, children }: CardStyles) => {
    return(
        <>
            <style jsx>{`
                div {
                    --gradient: ${gradient || "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)"};
                    --spacing: ${spacing || "3px"};
                    --outer-radius: ${outerRadius || "0"};
                    --inner-radius: ${innerRadius || "0"};
                    --outer-width: ${outerWidth || "300px"};
                    --outer-height: ${outerHeight || "400px"};
                }
            `}</style>
            <div className={styles.grad} style={{}}>
                <section className={styles.child}>
                    {children}
                </section>
            </div>
        </>
    );
}

export default Card;