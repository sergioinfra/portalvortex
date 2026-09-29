import { VocacaoEnum } from "./item.model";

const keyItensSelecionados = 'itens-selecionados';
const keyDamageInput = 'damage-input';
const keyProtecoesAtuais = 'protecoes-atuais';

export class LocalStorageUtils {

  public static SalvarItensSelecionados(vocacao: VocacaoEnum, handId: number, itensId: number[], arvPhysical: number, arvFire: number, arvEarth: number, arvEnergy: number, arvIce: number, arvHoly: number, arvDeath: number) {
    localStorage.setItem(keyItensSelecionados,
      JSON.stringify({
        vocacao,
        handId,
        itensId,
        arvPhysical: arvPhysical,
        arvFire: arvFire,
        arvEarth: arvEarth,
        arvEnergy: arvEnergy,
        arvIce: arvIce,
        arvHoly: arvHoly,
        arvDeath: arvDeath,
      }))
  }
  public static ObterItensSelecionadosPreviamente(vocacao: VocacaoEnum): { vocacao: VocacaoEnum, handId: number, itensId: number[], arvFire: number, arvEnergy: number, arvIce: number, arvEarth: number, arvHoly: number, arvDeath: number, arvPhysical: number } | undefined {
    try {
      let json = localStorage.getItem(keyItensSelecionados);
      if (!json) return undefined;
      return JSON.parse(json);
    } catch (err) {
      return undefined;
    }
  }

  public static SalvarDamageInput(damageInput: string) {
    localStorage.setItem(keyDamageInput, damageInput)
  }
  public static ObterDamageInput() {
    return localStorage.getItem(keyDamageInput)
  }

  public static SalvarProtecoesAtuais(physical: number, lifeDrain: number, manaDrain: number, fire: number, earth: number, energy: number, ice: number, holy: number, death: number) {
    localStorage.setItem(keyProtecoesAtuais,
      JSON.stringify({
        physical,
        lifeDrain,
        manaDrain,
        fire,
        earth,
        energy,
        ice,
        holy,
        death
      }))
  }
  public static ObterProtecoesAtuais(): { physical: number, lifeDrain: number, manaDrain: number, fire: number, earth: number, energy: number, ice: number, holy: number, death: number } | undefined {
    try {
      let json = localStorage.getItem(keyProtecoesAtuais);
      if (!json) return undefined;
      return JSON.parse(json);
    } catch (err) {
      return undefined;
    }
  }
}