function getGradeText(grade) {
    if (grade >= 90) {
        return "Відмінно";
    } else if (grade >= 75){
        return "Добре";
    } else if (grade >= 60){
        return "Задовільно";
    } else{
        return "Незадовільно";
    }
}

console.log(getGradeText(85))