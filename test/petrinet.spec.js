import PetriNet from "src/petriNet/PetriNet";


describe("Basic Petri net test", () => {
    let net;

    beforeEach(() => {
        net = new PetriNet("test", "Testing net");
    });

    it("check the net for correct setup", () => {
        expect(net.getMarking()).toBeDefined();
        expect(net.getMarking()).toEqual([]);
        expect(net.getEnabledTransitions()).toBeDefined();
        expect(net.getEnabledTransitions()).toEqual([]);
    });
});
