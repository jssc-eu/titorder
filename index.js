const program = require('commander');
const pjson = require('./package.json');
const csv = require('csv')
const fs = require('fs')

const TICKET_FIELDS_COLUMN_FROM = 'IP'
const TICKET_FIELDS_COLUMN_TO = 'Address 1'
const TICKET_NAMEPART_REMOVE = 'Quantity'

let input = ''

program
    .version(pjson.version)
    .description(pjson.description)
    .usage('node index.js <csv>')
    .action(function () {
        input = arguments[0];
    })
    .parse(process.argv);

if (!input) {
    program.outputHelp();
    process.exit(1)
    return;
}

const getTicketNames = function (obj) {
        let keys = Object.keys(obj);
        let start = keys.indexOf(TICKET_FIELDS_COLUMN_FROM)
        let end = keys.indexOf(TICKET_FIELDS_COLUMN_TO)
        let ticketColumns = keys.filter((key, index) => index > start && index < end)
        return ticketColumns
}

const getTickets = function (ticketColumns, order) {
     let collectedTickets = ticketColumns.reduce((tickets, ticket) => {

        if (order[ticket]) {
            tickets += `${order[ticket]} x ${ticket.replace(' ' + TICKET_NAMEPART_REMOVE, '')} ` + "\n"
        }

        return tickets
     }, '')
     order['Tickets'] = collectedTickets

    ticketColumns.forEach((ticket) => {
        delete order[ticket]
    })

    return order
}


fs.readFile(input, (err, rawdata) => {

    if (err) throw err;

    let data = rawdata.toString()

    csv.parse(data, {columns: true}, (err, csvData) => {

        if (err) throw err;

        let ticketColumns = getTicketNames(csvData[0])
        let dataWithTickets = csvData.map(getTickets.bind(null, ticketColumns))

        csv.stringify(
            dataWithTickets,
            {
                header: true
            },
            (err, result) => {
                process.stdout.write(result)
                process.exit(0)
            }
        )
    })
})