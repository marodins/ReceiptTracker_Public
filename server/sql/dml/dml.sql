SELECT * FROM
(SELECT receipt_id as receipt_id_1
FROM receipts
WHERE fk_user_receipt = (SELECT user_id from users WHERE email = 'account1@yahoo.com')
GROUP BY receipt_id ORDER BY receipt_id DESC LIMIT 2 )q1
LEFT JOIN
(SELECT store, receipt_date, item_name,item_price,item_id, receipt_id
FROM receipts
INNER JOIN items on receipts.receipt_id = items.fk_item_receipt)q2

ON q1.receipt_id_1 = q2.receipt_id;
