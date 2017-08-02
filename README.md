# titorder

Tito order export has separate column for every ticket type, this tool aggregates tickets of each order to a single field per order

It might be less parseable for machines, but more readable for human eyes

## usage

```

$ node index.js input.csv > output.csv

```

## results

#### from

| Early bird Ticket Quantity | Super Ticket Quantity | Discounted Ticket Quantity | late bird Ticket Quantity |
|----------------------------|-----------------------|----------------------------|---------------------------|
| 0                          | 1                     | 1                          | 0                         |
| 1                          | 2                     | 0                          | 0                         |
| 0                          | 1                     | 0                          | 3                         |


#### to

| Tickets                                 |
|-----------------------------------------|
| 1 x Super Ticket  1 x Discounted Ticket |
| 1 x Early bird Ticket  2 x Super Ticket |
| 3 x Late bird Ticket  1 x Super Ticket  |