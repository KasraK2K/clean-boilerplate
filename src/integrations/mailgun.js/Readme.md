# Mailgun

Mailgun integration example:

```typescript
async function createMessage() {
  new Promise(async (resolve, reject) => {
    const data = {
      to: ["kasra_k2k@yahoo.com"],
      subject: "html",
      text: "html Testing some Mailgun awesomness!",
      html: "<h1>HTML Content</h1>",
    }

    mailGunJS.message
      .createMessage(data)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
```

&nbsp;

This integration covered this methods:

## message

- [createMessage]()

&nbsp;

### `Note:`

- Before use replace certificate in mailgun/certificate.json
