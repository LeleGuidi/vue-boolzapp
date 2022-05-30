const app = new Vue({
    el: `#app`,
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        currentContact: 0,
        newMessage: ``,
        searchContact: ``,
        optionMessVisible: false,
    },
    methods: {
        sentMessage() {
            let currentDate = this.currentTime()
            let index = this.currentContact
            if(this.newMessage) {
                let message = {
                    date: currentDate,
                    message: this.newMessage,
                    status: 'sent'
                };
                this.contacts[this.currentContact].messages.push(message);
                this.newMessage = ``;
                setTimeout( () => {this.cpuMessage(index)}, 1000)
            }
        },

        cpuMessage(index) {
            let currentDate = this.currentTime()
            message = {
                date: currentDate,
                message: `ok`,
                status: 'received'
            };
            this.contacts[index].messages.push(message)

            this.scrollToBottom()
        },

        messageTime(index) {
            let date = this.contacts[this.currentContact].messages[index].date
            let times = date.split(" ");
            let time = times[1];
            let hourMinuteSecond = time.split(`:`);
            let hourMinute = `${hourMinuteSecond[0]}:${hourMinuteSecond[1]}`
            return hourMinute
        },

        lastTimeMessageSent(index) {
            let i = this.contacts[index].messages.length - 1;
            let date = this.contacts[index].messages[i].date;
            let times = date.split(" ");
            let time = times[1];
            let hourMinuteSecond = time.split(`:`);
            let hourMinute = `${hourMinuteSecond[0]}:${hourMinuteSecond[1]}`
            return hourMinute
        },

        lastMessageSent(index) {
            let i = this.contacts[index].messages.length - 1;
            let text = this.contacts[index].messages[i].message
            return text
        },
        
        searchContacts() {
            //Si poteva usare un foreach
            if(this.searchContact){
                for(let i = 0; i < this.contacts.length; i++) {
                    if(this.contacts[i].name.toLowerCase().includes(this.searchContact.toLowerCase())) {
                        this.contacts[i].visible = true;
                    } else {
                        this.contacts[i].visible = false;
                    }
                }
            } else {
                for(let i = 0; i < this.contacts.length; i++) {
                        this.contacts[i].visible = true;
                    }
            }
        },

        scrollToBottom() {
            const elem = this.$el.querySelector('.main_chat');
            elem.scrollTop = elem.scrollHeight;
        },

        currentTime() {
            let today = new Date();
            date = String(today.getDate()).padStart(2, '0') + "/" + String(today.getMonth() + 1).padStart(2, '0') + "/" + today.getFullYear();
            time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
            return currentDate = `${date} ${time}`
        }
    },
})





