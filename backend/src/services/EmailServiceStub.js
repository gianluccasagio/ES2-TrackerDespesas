class EmailServiceStub {
    // Simula o envio sem enviar de verdade
    sendEmail(to, subject, content) {
        console.log(`[STUB] Simulando envio de email para: ${to}`);
        return true;
    }
}

module.exports = EmailServiceStub;