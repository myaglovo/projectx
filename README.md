currentUser {
email: "mentor@mail.ru";
job: "123";
job_position: "123";
name: "Кошкин Антон";
owner_id: "";
password: "123";
phone: "123";
role: "minor";
slave_id: "cvdfwe3ESPDVqprZvLQV";
teenager_adress: "";
teenager_birthday: null;
teenager_education: "";
teenager_event_ids: null;
teenager_record_type: "";
teenager_registered_date: null;
teenager_representative: "";
teenager_representative_phone: "";
user_id: "mYDzARbqHjRJ2ZMecAZ1";
}

users {
0
:
{user_id: '91ckhuYmngCSZmLH7Kab', name: 'ИСПОЛНИТЕЛЬ', role: 'executor', phone: '1313', email: 'ispolnitel@mail.ru', …}
1
:
{user_id: 'cvdfwe3ESPDVqprZvLQV', name: 'Юрий Гармидер', role: 'teenager', phone: '12312313', email: 'teenager@mail.ru', …}
2
:
{user_id: 'eVmoiCD18CsnTXbAkdMD', name: 'Иванов Петр Сергеевич', role: 'curator', phone: '89123123123', email: 'curator@mail.ru', …}
3
:
{user_id: 'eZ64JDhYYfNJP8y1zjjo', name: 'Сергеев Вячеслав Валерьевич', role: 'curator', phone: '89123123123', email: 'curator2@mai.ru', …}
4
:
{user_id: 'mEqteQkbtCzTLfzvKpUn', name: 'Иванов Петр Степанович', role: 'curator', phone: '89111247397', email: 'curatortop@mail.ru', …}
5
:
{user_id: 'mYDzARbqHjRJ2ZMecAZ1', name: 'Кошкин Антон', role: 'minor', phone: '123', email: 'mentor@mail.ru', …}
6
:
{user_id: 'oKbkQm8p5ZrUXerqbhfQ', name: 'ФИО ИСПОЛНИТЕЛЯ', role: 'executor', phone: '123123123123', email: 'koshkin.9898123@mail.ru', …}
7
:
{user_id: 'vADZjBkibpUjPWupcPZj', name: 'Главный администратор', role: 'organizer', phone: '1', email: 'admin@admin.ru', …}
}

reportsData {
conclusions: "sdfsdfsdfsdfsdfsdf";
created_at: "2023-10-01T16:34:10.000Z";
event_id: "sdfsdfsdf";
help_grade: 1;
id: "123sdf";
involvement_grade: 4;
mentor_id: "sdfsdf";
negative_results: "sdfsfdsdf";
positive_results: "sdfsdfsdf";
teenager_id: "sdfsdfsdf";
}

teenagerEvents {
{id: 1, teenagerID: 'cvdfwe3ESPDVqprZvLQV', eventID: '6us9TASzFbvUyAB6KTig', createdAt: '2023-10-01T13:39:58.000Z'}
1
:
{id: 2, teenagerID: 'cvdfwe3ESPDVqprZvLQV', eventID: 'jisAbbwDxRCGa6qL8TUU', createdAt: '2023-10-01T14:05:49.000Z'}
2
:
{id: 3, teenagerID: 'cvdfwe3ESPDVqprZvLQV', eventID: 'bJnVJ61mVW8NgnvGEW8i', createdAt: '2023-10-01T16:07:17.000Z'}
}

// найти из списка "мероприятийСтудента" все мероприятия, у которых id равен id студента

// обогатить каждое мероприятие по id наименованием этого мероприятия

// выдать список этих мероприятий

const teenagerEventList = teenagerEvents.filger(event => event.teenagerID === currentUser.slave_id);
const eventListWithTitle = teenagerEventList.map((eventItem) => {
// Найти объект с совпадающим event_id в массиве events
const matchingEvent = eventData.find((event) => event.event_id === eventItem.eventID);

// Если совпадение найдено, добавить поле title
if (matchingEvent) {
return { ...eventItem, title: matchingEvent.event_title };
} else {
return eventItem;
}
});
