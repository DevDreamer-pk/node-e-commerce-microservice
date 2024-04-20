import amqplib from "amqplib";

const rabbitMQProducer = async () => {
    try {
        const queue = 'tasks';
        const connection = await amqplib.connect('amqp://localhost');

        const channel = await connection.createChannel();

        await channel.assertQueue(queue);

        const message = {
            content: "This is a test message by paramjeet", 
            timestamp: Date.now()
        };

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        // setInterval( async () => {
        //     await channel.sendToQueue(queue, Buffer.from('something to do'));
        //   }, 1000);

        // console.log("Message sent to RabbitMQ:", message);
    
        return { message };

    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
        return { error };
    }
};


export default rabbitMQProducer



// import amqplib from "amqplib";

// const rabbitMQConsumer = async () => {
//     try {
//         const queue = 'tasks';
//         const connection = await amqplib.connect('amqp://localhost');
//         const channel = await connection.createChannel();
//         channel.consume(queue, (msg) => {
//             console.log(`Received message: ${msg.content.toString()}`);
//             channel.ack(msg);
//         })
//     } catch (error) {
//         console.error("Error connecting to RabbitMQ:", error);
//         return { error };
//     }
// };

// export default rabbitMQConsumer