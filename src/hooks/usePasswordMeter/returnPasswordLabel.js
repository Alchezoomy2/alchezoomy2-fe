
export default function returnPasswordLabel(score) {

    switch (score) {
        case 0:
            return {
                returnLabel: "Weak", returnColor: "#f50057"
            };
        case 1:
            return {
                returnLabel: "Weak", returnColor: "#f50057"
            };
        case 2:
            return {
                returnLabel: "Fair", returnColor: "#ff9100"
            };
        case 3:
            return {
                returnLabel: "Good", returnColor: "#ffea00"
            };
        case 4:
            return {
                returnLabel: "Good", returnColor: "#00a152"
            };
        default:
            return {
                returnLabel: "Weak", returnColor: "#f50057"
            };
    }
}