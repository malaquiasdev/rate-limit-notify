import { Gateway, IGateway } from '../index'

describe("Gateway", () => {
  let gateway: IGateway
  
  const consoleInfoSpy = jest.spyOn(global.console, 'info').mockImplementation()

  beforeEach(() => {
    gateway = new Gateway()
  })

  test('should send message', async () => {
    const userId = 'mockUserId'
    const message = 'this is a test message'

    await gateway.send(userId, message)

    expect(consoleInfoSpy).toHaveBeenCalledWith('INFO: sending message to user mockUserId')
    expect(consoleInfoSpy).toHaveBeenCalledWith('INFO: message - this is a test message')
  })
})
