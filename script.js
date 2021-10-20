let days = {
    1:'понедельник',
    2:'вторник',
    3:'среда',
    4:'четверг',
    5:'пятница',
    6:'суббота',
    7:'воскресенье'
};
const monday_lessons = [
    '8:20:0',
    '9:0:0',
    '9:45:0',
    '10:25:0',
    '11:20:0',
    '12:0:0',
    '12:45:0',
    '13:25:0',
    '14:10:0',
    '14:50:0',
];
let everyday_lessons = [
    '8:20:0-9:5:0',
    '9:15:0-10:0:0',
    '10:10:0-10:55:0',
    '11:5:0-10:50:0',
    '12:10:0-12:55:0',
    '13:5:0-13:50:0',
    '14:10:0-14:55:0',
    '15:5:0-15:50:0',
    '16:0:0-16:45:0',
    '16:55:0-17:40:0',
    '17:50:0-18:35:0',
    '18:45:0-19:30:0',
];
let dada_lessons = [
    '1:7',
    '1:8',
    '1:9',
    '1:10',
    '1:11',
    '1:12',
];


const saturday_lessons = [
    '8:20:0',
    '9:50:0',
    '11:20:0',
    '12:50:0',
    '14:20:0',
    '15:50:0'
];
function check_hour(lesson_list) {

    let lesson_number = 0;
    for ( let val of lesson_list ) {
        lesson_number++;
        let lesson_list = lesson_list.split('-');
        let lestime = val.split(':');
        var s = 60,
            d = ':',
            b = lesson_list[0].split (d),
            b = b [0]* s * s + b [1] * s + +b [2],
            e = lesson_list[1].split (d),
            e = e [0]* s * s + e [1] * s + +e [2],
            t = new Date,
            t = t.getHours () * s * s + t.getMinutes () * s + t.getSeconds ();
        if (t >= b && t <= e) {
            return lesson_number;
        }
    }
}

function check_day(days) {
    let today = new Date().getDay();
    switch (today) {
        case 1:
            return days['1'];
        case 2:
            return days['2'];
        case 3:
            return days['3'];
        case 4:
            return days['4'];
        case 5:
            return days['5'];
        case 6:
            return days['6'];
        case 7:
            return days['7'];
    }
}
function check_timetable() {
    let today = new Date().getDay();
    switch (today) {
        case 1:
            return monday_lessons;
        case 6:
            return saturday_lessons;
        default:
            return everyday_lessons;
    }
}

let lesionList = check_timetable();

let timetable = new Vue({
    el: "#timetable",
    data: {
        today: check_day(days)
    },
});

let time = new Vue({
    el: '#time',
    data: {
        timestamp: ""
    },
    created() {
        setInterval(this.getNow, 1000);
    },
    methods: {
        getNow: function() {
            const today = new Date();
            const minutes = today.getMinutes();
            const seconds = today.getSeconds();
            const time = today.getHours() + ":" + minutes + ":" + seconds;
            this.timestamp = time;
        }
    }
});

let lesson = new Vue({
   el: "#lesson",
   data: {
       lNumber: ""
   },
    created() {
        setInterval(this.check_hour, 1000);
    },
    methods: {

        check_hour: function()
        {
            const today = new Date();
            let time = today.getHours() + ":" + today.getMinutes();
            let lesson_number = 0;
            time = time.split(':');

            for (let val of dada_lessons) {
                lesson_number++;
                let lestime = val.split(':');
                if (time[0] === lestime[0] && time[1] === lestime[1]) {
                    this.lNumber = lesson_number;
                } else if (time[0] === lestime[0] && time[1] >= lestime[1]) {
                    if (time[0] === lestime[0] && time[1] <= lestime[1]) {
                        this.lNumber = lesson_number;
                    }
                }
            }
        }
    }
});