const { spy, assert, stub, mock } = require("sinon");
const { UsuariosController } = require("./controller");
const { Database } = require("./database");

let respostaEsperada
describe("Controller de Usuários", () => {

    beforeAll(() => {
        respostaEsperada = [
            {
                id: 10,
                nome: "Nataly Ivonete",
                email: "natalyFofinhaDePapai@tesao.com",
            },
        ];
    });

    it("fake", () => {

        const fakeDataBase = {
            findAll() {
                return respostaEsperada;
            },
        };
        const controller = new UsuariosController(fakeDataBase);
        const response = controller.getAll();
        expect(response).toBe(respostaEsperada);
    });

    it("spy", () => {
        const findAll = spy(Database, "findAll");
        const controller = new UsuariosController(Database);
        controller.getAll();
        assert.calledWith(findAll, "usuarios");
        findAll.restore();
    });

    it('stub', () => {
        const findAll = stub(Database, 'findAll');
        findAll.withArgs('usuarios').returns(respostaEsperada);

        const controller = new UsuariosController(Database);
        const response = controller.getAll();

        assert.calledWith(findAll, "usuarios");
        expect(response).toEqual(respostaEsperada);

        findAll.restore();
    });

    it('mock', () => {
        const dbMock = mock(Database);
        dbMock.expects('findAll').once().withArgs('usuarios').returns(respostaEsperada);

        const controller = new UsuariosController(Database);
        const response = controller.getAll();
        expect(response).toEqual(respostaEsperada);

        dbMock.verify();
        dbMock.restore();
    });
});
