function calculerMoyenne(notes) {
    if (!notes || notes.length === 0) {
        throw new Error("La liste de notes est vide");
    }

    let total = 0;

    for (const n of notes) {
        if (typeof n !== "number") {
            throw new Error(`Note invalide : ${n}`);
        }
        if (n < 0 || n > 20) {
            throw new Error("Note hors limites");
        }
        total += n;
    }

    return total / notes.length;
}

module.exports = { calculerMoyenne };
