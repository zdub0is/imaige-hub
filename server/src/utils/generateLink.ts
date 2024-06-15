
export function generateLink() {
    const linkLength = 5;

    const eligbleChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", "_",
        "0","1","2","3","4","5","6","7","8","9"
    ]

    let link = "";

    for(let i = 0; i < linkLength; i++){
        link += eligbleChars[Math.floor(Math.random()*eligbleChars.length)];
    }

    return link;
}

