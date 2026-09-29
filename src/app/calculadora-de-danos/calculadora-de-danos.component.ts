import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImbuimentProtecaoEnum, Item, ProtecaoEnum, SlotEnum, VocacaoEnum } from '../item.model';
import { LocalStorageUtils } from '../local.storage.util';
import { VocacaoItens } from '../vocacao.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calculadora-de-danos',
  templateUrl: './calculadora-de-danos.component.html',
  styleUrls: ['./calculadora-de-danos.component.scss']
})
export class CalculadoraDeDanosComponent implements OnInit, AfterViewInit {

  damageInput: string = ``;

  protecaoAtual_Physical: number = 0;
  protecaoAtual_LifeDrain: number = 0;
  protecaoAtual_ManaDrain: number = 0;
  protecaoAtual_Fire: number = 0;
  protecaoAtual_Earth: number = 0;
  protecaoAtual_Energy: number = 0;
  protecaoAtual_Ice: number = 0;
  protecaoAtual_Holy: number = 0;
  protecaoAtual_Death: number = 0;

  danoAtual_Physical: number = 0;
  danoAtual_LifeDrain: number = 0;
  danoAtual_ManaDrain: number = 0;
  danoAtual_Fire: number = 0;
  danoAtual_Earth: number = 0;
  danoAtual_Energy: number = 0;
  danoAtual_Ice: number = 0;
  danoAtual_Holy: number = 0;
  danoAtual_Death: number = 0;
  danoAtual_Total: number = 0;

  danoReal_Physical: number = 0;
  danoReal_LifeDrain: number = 0;
  danoReal_ManaDrain: number = 0;
  danoReal_Fire: number = 0;
  danoReal_Earth: number = 0;
  danoReal_Energy: number = 0;
  danoReal_Ice: number = 0;
  danoReal_Holy: number = 0;
  danoReal_Death: number = 0;
  danoReal_Total: number = 0;

  danoRealPercentual_Physical: number = 0;
  danoRealPercentual_LifeDrain: number = 0;
  danoRealPercentual_ManaDrain: number = 0;
  danoRealPercentual_Fire: number = 0;
  danoRealPercentual_Earth: number = 0;
  danoRealPercentual_Energy: number = 0;
  danoRealPercentual_Ice: number = 0;
  danoRealPercentual_Holy: number = 0;
  danoRealPercentual_Death: number = 0;

  protecaoSugestao_Physical: number = 0;
  protecaoSugestao_LifeDrain: number = 0;
  protecaoSugestao_ManaDrain: number = 0;
  protecaoSugestao_Fire: number = 0;
  protecaoSugestao_Earth: number = 0;
  protecaoSugestao_Energy: number = 0;
  protecaoSugestao_Ice: number = 0;
  protecaoSugestao_Holy: number = 0;
  protecaoSugestao_Death: number = 0;

  danoPossivel_Physical: number = 0;
  danoPossivel_LifeDrain: number = 0;
  danoPossivel_ManaDrain: number = 0;
  danoPossivel_Fire: number = 0;
  danoPossivel_Earth: number = 0;
  danoPossivel_Energy: number = 0;
  danoPossivel_Ice: number = 0;
  danoPossivel_Holy: number = 0;
  danoPossivel_Death: number = 0;
  danoPossivel_Total: number = 0;

  danoPossivelPercentual_Physical: number = 0;
  danoPossivelPercentual_LifeDrain: number = 0;
  danoPossivelPercentual_ManaDrain: number = 0;
  danoPossivelPercentual_Fire: number = 0;
  danoPossivelPercentual_Earth: number = 0;
  danoPossivelPercentual_Energy: number = 0;
  danoPossivelPercentual_Ice: number = 0;
  danoPossivelPercentual_Holy: number = 0;
  danoPossivelPercentual_Death: number = 0;

  danoPossivelPercentual_Total: number = 0;

  vocacaoSelecionada: VocacaoEnum | undefined;

  protecaoArvore_Physical: number = 0;
  protecaoArvore_Fire: number = 0;
  protecaoArvore_Earth: number = 0;
  protecaoArvore_Energy: number = 0;
  protecaoArvore_Ice: number = 0;
  protecaoArvore_Holy: number = 0;
  protecaoArvore_Death: number = 0;

  itens: Item[] = [];
  sugestaoDeItensAplicada: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private toastr: ToastrService,
    private meta: Meta,
    private title: Title) {

    this.meta.addTags([
      { name: 'description', content: 'Este sistema busca te ajudar a encontrar a melhor combinação de itens para aumentar/aprimorar a sua defesa de danos na hunt recebidos.' },
      { name: 'keywords', content: 'Tibia, Calculadora de Danos, Danos Recebidos, Damage Input' },
    ])
    this.title.setTitle("Portal Ze Tibinha | Calculadora de Danos Recebidos - Tibia");
  }

  ngOnInit(): void {
    const damageSaved = LocalStorageUtils.ObterDamageInput();
    if (damageSaved != undefined && damageSaved != null)
      this.damageInput = damageSaved;

    const protecoesSalvas = LocalStorageUtils.ObterProtecoesAtuais();
    if (protecoesSalvas != undefined && protecoesSalvas != null) {
      this.protecaoAtual_Physical = protecoesSalvas.physical;
      this.protecaoAtual_LifeDrain = protecoesSalvas.lifeDrain;
      this.protecaoAtual_ManaDrain = protecoesSalvas.manaDrain;
      this.protecaoAtual_Fire = protecoesSalvas.fire;
      this.protecaoAtual_Earth = protecoesSalvas.earth;
      this.protecaoAtual_Energy = protecoesSalvas.energy;
      this.protecaoAtual_Ice = protecoesSalvas.ice;
      this.protecaoAtual_Holy = protecoesSalvas.holy;
      this.protecaoAtual_Death = protecoesSalvas.death;
    }

    if (this.damageInput != undefined && this.damageInput != null)
      this.calcular();
  }

  ngAfterViewInit(): void {

  }

  calcular(resetarSugestao: boolean = true) {
    if (resetarSugestao) {
      this.sugestaoDeItensAplicada = false;
      this.limparSugestoes();

      LocalStorageUtils.SalvarDamageInput(this.damageInput);
      LocalStorageUtils.SalvarProtecoesAtuais(this.protecaoAtual_Physical, this.protecaoAtual_LifeDrain, this.protecaoAtual_ManaDrain, this.protecaoAtual_Fire, this.protecaoAtual_Earth, this.protecaoAtual_Energy, this.protecaoAtual_Ice, this.protecaoAtual_Holy, this.protecaoAtual_Death);
    }

    const damageArray = this.damageInput.split(/\r?\n/)
    if (damageArray?.length <= 1) return;

    this.danoAtual_Physical = 0;
    this.danoAtual_LifeDrain = 0;
    this.danoAtual_ManaDrain = 0;
    this.danoAtual_Fire = 0;
    this.danoAtual_Earth = 0;
    this.danoAtual_Holy = 0;
    this.danoAtual_Energy = 0;
    this.danoAtual_Ice = 0;
    this.danoAtual_Holy = 0;
    this.danoAtual_Death = 0;

    let loop = true;

    damageArray.forEach(line => {
      if (!loop || !line) return;

      if (line?.trim().startsWith("Physical")) {
        this.danoAtual_Physical = this.extrairDano(line);
      } else if (line?.trim().startsWith("Fire")) {
        this.danoAtual_Fire = this.extrairDano(line);
      } else if (line?.trim().startsWith("Earth")) {
        this.danoAtual_Earth = this.extrairDano(line);
      } else if (line?.trim().startsWith("Holy")) {
        this.danoAtual_Holy = this.extrairDano(line);
      } else if (line?.trim().startsWith("Energy")) {
        this.danoAtual_Energy = this.extrairDano(line);
      } else if (line?.trim().startsWith("Ice")) {
        this.danoAtual_Ice = this.extrairDano(line);
      } else if (line?.trim().startsWith("Holy")) {
        this.danoAtual_Holy = this.extrairDano(line);
      } else if (line?.trim().startsWith("Death")) {
        this.danoAtual_Death = this.extrairDano(line);
      } else if (line?.trim().startsWith("Life Drain")) {
        this.danoAtual_LifeDrain = this.extrairDano(line, 2);
      } else if (line?.trim().startsWith("Mana Drain")) {
        this.danoAtual_ManaDrain = this.extrairDano(line, 2);
      } else if (line?.trim().startsWith("Damage Sources")) {
        loop = false;
      }
    });

    this.danoAtual_Total = this.danoAtual_Physical + this.danoAtual_Fire + this.danoAtual_Earth
      + this.danoAtual_Energy + this.danoAtual_Ice + this.danoAtual_Holy + this.danoAtual_Death
      + this.danoAtual_LifeDrain + this.danoAtual_ManaDrain;

    this.danoReal_Physical = (this.danoAtual_Physical * 100) / (100 - this.protecaoAtual_Physical);
    this.danoReal_LifeDrain = (this.danoAtual_LifeDrain * 100) / (100 - this.protecaoAtual_LifeDrain);
    this.danoReal_ManaDrain = (this.danoAtual_ManaDrain * 100) / (100 - this.protecaoAtual_ManaDrain);
    this.danoReal_Fire = (this.danoAtual_Fire * 100) / (100 - this.protecaoAtual_Fire);
    this.danoReal_Earth = (this.danoAtual_Earth * 100) / (100 - this.protecaoAtual_Earth);
    this.danoReal_Energy = (this.danoAtual_Energy * 100) / (100 - this.protecaoAtual_Energy);
    this.danoReal_Ice = (this.danoAtual_Ice * 100) / (100 - this.protecaoAtual_Ice);
    this.danoReal_Holy = (this.danoAtual_Holy * 100) / (100 - this.protecaoAtual_Holy);
    this.danoReal_Death = (this.danoAtual_Death * 100) / (100 - this.protecaoAtual_Death);

    this.danoReal_Total = this.danoReal_Physical + this.danoReal_Fire + this.danoReal_Earth
      + this.danoReal_Energy + this.danoReal_Ice + this.danoReal_Holy + this.danoReal_Death
      + this.danoReal_LifeDrain + this.danoReal_ManaDrain;

    this.danoRealPercentual_Physical = (this.danoReal_Physical * 100) / this.danoReal_Total;
    this.danoRealPercentual_LifeDrain = (this.danoReal_LifeDrain * 100) / this.danoReal_Total;
    this.danoRealPercentual_ManaDrain = (this.danoReal_ManaDrain * 100) / this.danoReal_Total;
    this.danoRealPercentual_Fire = (this.danoReal_Fire * 100) / this.danoReal_Total;
    this.danoRealPercentual_Earth = (this.danoReal_Earth * 100) / this.danoReal_Total;
    this.danoRealPercentual_Energy = (this.danoReal_Energy * 100) / this.danoReal_Total;
    this.danoRealPercentual_Ice = (this.danoReal_Ice * 100) / this.danoReal_Total;
    this.danoRealPercentual_Holy = (this.danoReal_Holy * 100) / this.danoReal_Total;
    this.danoRealPercentual_Death = (this.danoReal_Death * 100) / this.danoReal_Total;


    this.danoPossivel_Physical = (this.danoReal_Physical * (100 - this.protecaoSugestao_Physical)) / 100;
    this.danoPossivel_LifeDrain = (this.danoReal_LifeDrain * (100 - this.protecaoSugestao_LifeDrain)) / 100;
    this.danoPossivel_ManaDrain = (this.danoReal_ManaDrain * (100 - this.protecaoSugestao_ManaDrain)) / 100;
    this.danoPossivel_Fire = (this.danoReal_Fire * (100 - this.protecaoSugestao_Fire)) / 100;
    this.danoPossivel_Earth = (this.danoReal_Earth * (100 - this.protecaoSugestao_Earth)) / 100;
    this.danoPossivel_Energy = (this.danoReal_Energy * (100 - this.protecaoSugestao_Energy)) / 100;
    this.danoPossivel_Ice = (this.danoReal_Ice * (100 - this.protecaoSugestao_Ice)) / 100;
    this.danoPossivel_Holy = (this.danoReal_Holy * (100 - this.protecaoSugestao_Holy)) / 100;
    this.danoPossivel_Death = (this.danoReal_Death * (100 - this.protecaoSugestao_Death)) / 100;

    this.danoPossivel_Total = this.danoPossivel_Physical + this.danoPossivel_Fire + this.danoPossivel_Earth
      + this.danoPossivel_Energy + this.danoPossivel_Ice + this.danoPossivel_Holy + this.danoPossivel_Death
      + this.danoPossivel_LifeDrain + this.danoPossivel_ManaDrain;

    this.danoPossivelPercentual_Physical = (this.danoPossivel_Physical * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_LifeDrain = (this.danoPossivel_LifeDrain * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_ManaDrain = (this.danoPossivel_ManaDrain * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_Fire = (this.danoPossivel_Fire * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_Earth = (this.danoPossivel_Earth * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_Energy = (this.danoPossivel_Energy * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_Ice = (this.danoPossivel_Ice * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_Holy = (this.danoPossivel_Holy * 100) / this.danoPossivel_Total;
    this.danoPossivelPercentual_Death = (this.danoPossivel_Death * 100) / this.danoPossivel_Total;

    this.danoPossivelPercentual_Total = 100 - (this.danoPossivel_Total * 100) / this.danoAtual_Total;
  }

  extrairDano(line: string, indexDano: number = 1): number {
    try {
      return +(line?.trim().split(" ")[indexDano].replace(/\,/gi, "").replace(/\./gi, "")) ?? 0;
    } catch (error) {
      return 0;
    }
  }

  definirVocacao(vocacao: VocacaoEnum) {
    this.vocacaoSelecionada = vocacao;

    this.handSugerido = undefined;
    this.limparSugestoes();

    this.carregarItens(vocacao);

    this.obterItensSelecionadosPreviamente(vocacao);
  }

  carregarItens(vocacao: VocacaoEnum) {
    this.itens = [];
    this.itens = VocacaoItens.itens().filter(p => p.vocacao.some(v => v == vocacao));
  }

  get hands() { return this.itens.filter(p => p.slot == SlotEnum.Hand); }
  get helmets() { return this.itens.filter(p => p.slot == SlotEnum.Helmet); }
  get armors() { return this.itens.filter(p => p.slot == SlotEnum.Armor); }
  get legs() { return this.itens.filter(p => p.slot == SlotEnum.Legs); }
  get boots() { return this.itens.filter(p => p.slot == SlotEnum.Boots); }
  get shields() { return this.itens.filter(p => p.slot == SlotEnum.ShieldOrSpellbookOrQuiver); }
  get amulets() { return this.itens.filter(p => p.slot == SlotEnum.Amulet); }
  get rings() { return this.itens.filter(p => p.slot == SlotEnum.Ring); }
  get extrasSlots() { return this.itens.filter(p => p.slot == SlotEnum.ExtraSlot); }

  handSugerido: Item | undefined = undefined;
  helmetSugerido: Item | undefined;
  armorSugerida: Item | undefined;
  armorImbuimentSugerido: ProtecaoEnum[] = [];
  legsSugerida: Item | undefined;
  bootsSugerida: Item | undefined;
  shieldSugerido: Item | undefined;
  shieldImbuimentSugerido: ProtecaoEnum[] = [];
  amuletSugerido: Item | undefined;
  ringSugerido: Item | undefined;
  extraSlotSugerido: Item | undefined;

  limparSugestoes() {
    this.helmetSugerido = undefined;
    this.armorSugerida = undefined;
    this.armorImbuimentSugerido = [];
    this.legsSugerida = undefined;
    this.bootsSugerida = undefined;
    this.shieldSugerido = undefined;
    this.shieldImbuimentSugerido = [];
    this.amuletSugerido = undefined;
    this.ringSugerido = undefined;
    this.extraSlotSugerido = undefined;
  }

  calculandoSugestaoDeItens: boolean = false;

  greeting: Promise<string> | null = null;

  itemDefault: Item = new Item(-1, "", "", [], SlotEnum.Armor, 0, false, [], 0);
  sugerirItens() {
    this.calculandoSugestaoDeItens = true;

    setTimeout(() => this.sugerirItensAsync(), 300);
  }
  sugerirItensAsync() {

    this.sugestaoDeItensAplicada = false;

    let maiorDiminuicaoDeDano: number | undefined = undefined;

    this.limparSugestoes();

    this.changeDetector.detach();

    let helmetsSelecionados = this.helmets.filter(p => p.selecionado);
    let armorsSelecionados = this.armors.filter(p => p.selecionado);
    let legsSelecionados = this.legs.filter(p => p.selecionado);
    let bootsSelecionados = this.boots.filter(p => p.selecionado);
    let shieldsSelecionados = this.shields.filter(p => p.selecionado);
    let amuletsSelecionados = this.amulets.filter(p => p.selecionado);
    let ringsSelecionados = this.rings.filter(p => p.selecionado);
    let extrasSlotsSelecionados = this.extrasSlots.filter(p => p.selecionado);

    if (this.vocacaoSelecionada)
      LocalStorageUtils.SalvarItensSelecionados(this.vocacaoSelecionada, this.handSugerido?.id ?? 0, this.itens.filter(p => p.selecionado).map(p => p.id),
        this.protecaoArvore_Physical, this.protecaoArvore_Fire, this.protecaoArvore_Earth, this.protecaoArvore_Energy, this.protecaoArvore_Ice, this.protecaoArvore_Holy, this.protecaoArvore_Death);

    if (helmetsSelecionados.length == 0) helmetsSelecionados.push(this.itemDefault);
    if (armorsSelecionados.length == 0) armorsSelecionados.push(this.itemDefault);
    if (legsSelecionados.length == 0) legsSelecionados.push(this.itemDefault);
    if (bootsSelecionados.length == 0) bootsSelecionados.push(this.itemDefault);
    if (shieldsSelecionados.length == 0) shieldsSelecionados.push(this.itemDefault);
    if (amuletsSelecionados.length == 0) amuletsSelecionados.push(this.itemDefault);
    if (ringsSelecionados.length == 0) ringsSelecionados.push(this.itemDefault);
    if (extrasSlotsSelecionados.length == 0) extrasSlotsSelecionados.push(this.itemDefault);

    const maximoDeCombinacoes = 1_000_000;

    let combinacoesPossiveis = 1;
    helmetsSelecionados.forEach(helmet => {
      let protecoesHelmet = this.obterProtecoesDoItem(helmet);

      armorsSelecionados.forEach(armor => {
        if (combinacoesPossiveis > maximoDeCombinacoes) return;
        let protecoesArmor = this.obterProtecoesDoItem(armor);

        legsSelecionados.forEach(legs => {
          if (combinacoesPossiveis > maximoDeCombinacoes) return;
          let protecoesLegs = this.obterProtecoesDoItem(legs);

          bootsSelecionados.forEach(boots => {
            if (combinacoesPossiveis > maximoDeCombinacoes) return;
            let protecoesBoots = this.obterProtecoesDoItem(boots);

            shieldsSelecionados.forEach(shield => {
              if (combinacoesPossiveis > maximoDeCombinacoes) return;
              let protecoesShield = this.obterProtecoesDoItem(shield);

              amuletsSelecionados.forEach(amulet => {
                if (combinacoesPossiveis > maximoDeCombinacoes) return;
                let protecoesAmulet = this.obterProtecoesDoItem(amulet);

                ringsSelecionados.forEach(ring => {
                  if (combinacoesPossiveis > maximoDeCombinacoes) return;
                  let protecoesRing = this.obterProtecoesDoItem(ring);

                  extrasSlotsSelecionados.forEach(extraSlot => {
                    if (combinacoesPossiveis > maximoDeCombinacoes) return;
                    let protecoesExtraSlot = this.obterProtecoesDoItem(extraSlot);

                    let imbuimentsArmor = this.obterProtecoesDoItemViaImbuiments(armor);
                    if (!imbuimentsArmor || imbuimentsArmor.length == 0) {
                      imbuimentsArmor = [];
                      imbuimentsArmor.push([{ protecao: ProtecaoEnum.Physical, valorProtecao: 0 }]);
                    }

                    imbuimentsArmor.forEach(imbuiArmor => {

                      let imbuimentsShield = this.obterProtecoesDoItemViaImbuiments(shield);
                      if (!imbuimentsShield || imbuimentsShield.length == 0) {
                        imbuimentsShield = [];
                        imbuimentsShield.push([{ protecao: ProtecaoEnum.Physical, valorProtecao: 0 }]);
                      }

                      imbuimentsShield.forEach(imbuiShield => {
                        combinacoesPossiveis++;

                        if (combinacoesPossiveis > maximoDeCombinacoes) return;

                        this.protecaoSugestao_Physical = 0;
                        this.protecaoSugestao_LifeDrain = 0;
                        this.protecaoSugestao_ManaDrain = 0;
                        this.protecaoSugestao_Fire = 0;
                        this.protecaoSugestao_Earth = 0;
                        this.protecaoSugestao_Energy = 0;
                        this.protecaoSugestao_Ice = 0;
                        this.protecaoSugestao_Holy = 0;
                        this.protecaoSugestao_Death = 0;

                        this.aplicarProtecaoDoItem(protecoesHelmet);
                        this.aplicarProtecaoDoItem(protecoesArmor);
                        this.aplicarProtecaoDoItem(imbuiArmor);
                        this.aplicarProtecaoDoItem(imbuiShield);
                        this.aplicarProtecaoDoItem(protecoesLegs);
                        this.aplicarProtecaoDoItem(protecoesBoots);
                        this.aplicarProtecaoDoItem(protecoesShield);
                        this.aplicarProtecaoDoItem(protecoesAmulet);
                        this.aplicarProtecaoDoItem(protecoesRing);
                        this.aplicarProtecaoDoItem(protecoesExtraSlot);

                        this.calcular(false);

                        if (maiorDiminuicaoDeDano == undefined) {
                          maiorDiminuicaoDeDano = (this.danoAtual_Total - this.danoPossivel_Total);
                          this.helmetSugerido = helmet;
                          this.armorSugerida = armor;
                          this.legsSugerida = legs;
                          this.bootsSugerida = boots;
                          this.shieldSugerido = shield;
                          this.armorImbuimentSugerido = (imbuiArmor?.length > 0 ?? false) ? imbuiArmor.filter(p => p.valorProtecao > 0).map(p => p.protecao) : [];
                          this.shieldImbuimentSugerido = (imbuiShield?.length > 0 ?? false) ? imbuiShield.filter(p => p.valorProtecao > 0).map(p => p.protecao) : [];
                          this.amuletSugerido = amulet;
                          this.ringSugerido = ring;
                          this.extraSlotSugerido = extraSlot;
                        } else {
                          if ((this.danoAtual_Total - this.danoPossivel_Total) > maiorDiminuicaoDeDano) {
                            maiorDiminuicaoDeDano = (this.danoAtual_Total - this.danoPossivel_Total);
                            this.helmetSugerido = helmet;
                            this.armorSugerida = armor;
                            this.legsSugerida = legs;
                            this.bootsSugerida = boots;
                            this.shieldSugerido = shield;
                            this.armorImbuimentSugerido = (imbuiArmor?.length > 0 ?? false) ? imbuiArmor.filter(p => p.valorProtecao > 0).map(p => p.protecao) : [];
                            this.shieldImbuimentSugerido = (imbuiShield?.length > 0 ?? false) ? imbuiShield.filter(p => p.valorProtecao > 0).map(p => p.protecao) : [];
                            this.amuletSugerido = amulet;
                            this.ringSugerido = ring;
                            this.extraSlotSugerido = extraSlot;
                          }
                        }
                      });
                    });

                  })
                })
              })
            })
          })
        })
      })
    })

    if (combinacoesPossiveis > maximoDeCombinacoes) {
      this.calculandoSugestaoDeItens = false;
      this.toastr.error(`Foram encontradas mais de ${maximoDeCombinacoes} combinações, por favor diminua a opção de itens.`);
      return;
    }

    this.protecaoSugestao_Physical = 0;
    this.protecaoSugestao_Fire = 0;
    this.protecaoSugestao_Earth = 0;
    this.protecaoSugestao_Energy = 0;
    this.protecaoSugestao_Ice = 0;
    this.protecaoSugestao_Holy = 0;
    this.protecaoSugestao_Death = 0;
    this.protecaoSugestao_LifeDrain = 0;
    this.protecaoSugestao_ManaDrain = 0;

    if (this.helmetSugerido != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.helmetSugerido));
    if (this.armorSugerida != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.armorSugerida));
    if (this.armorImbuimentSugerido != undefined) this.armorImbuimentSugerido.forEach(imbui => this.aplicarProtecaoDoItem([{ protecao: imbui, valorProtecao: (imbui == ProtecaoEnum.Death ? 10 : 15) }]))
    if (this.legsSugerida != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.legsSugerida));
    if (this.bootsSugerida != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.bootsSugerida));
    if (this.shieldSugerido != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.shieldSugerido));
    if (this.shieldImbuimentSugerido != undefined) this.shieldImbuimentSugerido.forEach(imbui => this.aplicarProtecaoDoItem([{ protecao: imbui, valorProtecao: (imbui == ProtecaoEnum.Death ? 10 : 15) }]))
    if (this.amuletSugerido != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.amuletSugerido));
    if (this.ringSugerido != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.ringSugerido));
    if (this.extraSlotSugerido != undefined) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.extraSlotSugerido));
    if (this.protecaoArvore_Physical) this.aplicarProtecaoDoItem([{ protecao: ProtecaoEnum.Physical, valorProtecao: this.protecaoArvore_Physical }])
    if (this.protecaoArvore_Fire) this.aplicarProtecaoDoItem([{ protecao: ProtecaoEnum.Fire, valorProtecao: this.protecaoArvore_Fire }])
    if (this.protecaoArvore_Earth) this.aplicarProtecaoDoItem([{ protecao: ProtecaoEnum.Earth, valorProtecao: this.protecaoArvore_Earth }])
    if (this.protecaoArvore_Energy) this.aplicarProtecaoDoItem([{ protecao: ProtecaoEnum.Energy, valorProtecao: this.protecaoArvore_Energy }])
    if (this.protecaoArvore_Ice) this.aplicarProtecaoDoItem([{ protecao: ProtecaoEnum.Ice, valorProtecao: this.protecaoArvore_Ice }])
    if (this.protecaoArvore_Holy) this.aplicarProtecaoDoItem([{ protecao: ProtecaoEnum.Holy, valorProtecao: this.protecaoArvore_Holy }])
    if (this.protecaoArvore_Death) this.aplicarProtecaoDoItem([{ protecao: ProtecaoEnum.Death, valorProtecao: this.protecaoArvore_Death }])

    if (this.handSugerido != undefined && (this.handSugerido?.id ?? false)) this.aplicarProtecaoDoItem(this.obterProtecoesDoItem(this.handSugerido));

    this.changeDetector.reattach();

    this.protecaoSugestao_Physical = this.protecaoSugestao_Physical;
    this.protecaoSugestao_LifeDrain = this.protecaoSugestao_LifeDrain;
    this.protecaoSugestao_ManaDrain = this.protecaoSugestao_ManaDrain;
    this.protecaoSugestao_Fire = this.protecaoSugestao_Fire;
    this.protecaoSugestao_Earth = this.protecaoSugestao_Earth;
    this.protecaoSugestao_Energy = this.protecaoSugestao_Energy;
    this.protecaoSugestao_Ice = this.protecaoSugestao_Ice;
    this.protecaoSugestao_Holy = this.protecaoSugestao_Holy;
    this.protecaoSugestao_Death = this.protecaoSugestao_Death;

    this.calcular(false);

    this.sugestaoDeItensAplicada = true;
    this.calculandoSugestaoDeItens = false;

    if (this.danoAtual_Total > this.danoPossivel_Total)
      this.toastr.success(`Dentre as ${combinacoesPossiveis} combinações analisadas, encontramos a melhor para você.`, "", { timeOut: 10_000 });
    else if (this.danoAtual_Total < this.danoPossivel_Total)
      this.toastr.error(`Dentre as ${combinacoesPossiveis} combinações analisadas, não encontramos melhorias possíveis.`, "", { timeOut: 10_000 });
    else
      this.toastr.warning(`Dentre as ${combinacoesPossiveis} combinações analisadas, não encontramos melhorias possíveis.`, "", { timeOut: 10_000 });
  }

  salvarItensSelecionados(vocacao: VocacaoEnum, handId: number, itensId: number[], arvFire: number, arvEnergy: number, arvIce: number, arvEarth: number) {
    localStorage.setItem("itens-selecionados",
      JSON.stringify({
        vocacao,
        handId,
        itensId,
        arvFire: arvFire,
        arvEnergy: arvEnergy,
        arvIce: arvIce,
        arvEarth: arvEarth,
      }))
  }
  obterItensSelecionadosPreviamente(vocacao: VocacaoEnum) {
    try {
      var dados = LocalStorageUtils.ObterItensSelecionadosPreviamente(vocacao);
      if (dados == undefined || !dados || !dados?.vocacao || !dados?.itensId || dados?.itensId.length == 0) return;

      this.itens?.forEach(item => {
        if (dados?.itensId.some(id => id == item.id))
          item.selecionado = true;
      });

      if (dados.handId != undefined) this.handSugerido = this.itens.find(p => p.id == dados?.handId ?? 0);

      if (dados.arvPhysical != undefined) this.protecaoArvore_Physical = dados.arvPhysical;
      if (dados.arvFire != undefined) this.protecaoArvore_Fire = dados.arvFire;
      if (dados.arvEarth != undefined) this.protecaoArvore_Earth = dados.arvEarth;
      if (dados.arvEnergy != undefined) this.protecaoArvore_Energy = dados.arvEnergy;
      if (dados.arvIce != undefined) this.protecaoArvore_Ice = dados.arvIce;
      if (dados.arvHoly != undefined) this.protecaoArvore_Holy = dados.arvHoly;
      if (dados.arvDeath != undefined) this.protecaoArvore_Death = dados.arvDeath;

    } catch (err) {
      console.error("Não foi possível obter os itens selecioandos. Erro: " + err)
    }
    return null;
  }

  aplicarProtecaoDoItem(protecoes: { protecao: ProtecaoEnum, valorProtecao: number }[]) {
    protecoes?.forEach(protecao => {
      if (protecao.valorProtecao == 0) return;

      switch (protecao.protecao) {
        case ProtecaoEnum.Physical: this.protecaoSugestao_Physical = this.calcularProtecao(this.protecaoSugestao_Physical, protecao.valorProtecao); break;
        case ProtecaoEnum.LifeDrain: this.protecaoSugestao_LifeDrain = this.calcularProtecao(this.protecaoSugestao_LifeDrain, protecao.valorProtecao); break;
        case ProtecaoEnum.ManaDrain: this.protecaoSugestao_ManaDrain = this.calcularProtecao(this.protecaoSugestao_ManaDrain, protecao.valorProtecao); break;
        case ProtecaoEnum.Fire: this.protecaoSugestao_Fire = this.calcularProtecao(this.protecaoSugestao_Fire, protecao.valorProtecao); break;
        case ProtecaoEnum.Earth: this.protecaoSugestao_Earth = this.calcularProtecao(this.protecaoSugestao_Earth, protecao.valorProtecao); break;
        case ProtecaoEnum.Energy: this.protecaoSugestao_Energy = this.calcularProtecao(this.protecaoSugestao_Energy, protecao.valorProtecao); break;
        case ProtecaoEnum.Ice: this.protecaoSugestao_Ice = this.calcularProtecao(this.protecaoSugestao_Ice, protecao.valorProtecao); break;
        case ProtecaoEnum.Holy: this.protecaoSugestao_Holy = this.calcularProtecao(this.protecaoSugestao_Holy, protecao.valorProtecao); break;
        case ProtecaoEnum.Death: this.protecaoSugestao_Death = this.calcularProtecao(this.protecaoSugestao_Death, protecao.valorProtecao); break;
      }
    });
  }

  calcularProtecao(protecaoAtual: number, adicionarProtecao: number): number {
    const valorInicial = (100 - protecaoAtual);
    //return Math.round(100 - (valorInicial - ((valorInicial * adicionarProtecao) / 100)));
    return 100 - (valorInicial - ((valorInicial * adicionarProtecao) / 100))
  }

  obterDicionarioItemEProtecoesLiberados(slot: SlotEnum) {
    let dic: { item: Item, protecao: ProtecaoEnum, valorProtecao: number }[] = [];
    this.itens.filter(p => p.selecionado && p.slot == slot).forEach(item => {
      item.protecoes?.forEach(p => {
        dic.push({ item, protecao: p.protecao, valorProtecao: p.percentual });
      })
    })
    return dic;
  }

  obterProtecoesDoItem(item: Item): { protecao: ProtecaoEnum, valorProtecao: number }[] {
    let dic: { protecao: ProtecaoEnum, valorProtecao: number }[] = [];
    item.protecoes?.forEach(p => {
      dic.push({ protecao: p.protecao, valorProtecao: p.percentual });
    });
    return dic;
  }
  obterProtecoesDoItemViaImbuiments(item: Item): { protecao: ProtecaoEnum, valorProtecao: number }[][] {
    if (!item || (!item.selecionado ?? false)) return [];

    let dic: { protecao: ProtecaoEnum, valorProtecao: number }[][] = [];
    if (item.imbuimentSlot > 0 && item.imbuiments) {

      for (let i = 0; i < item.imbuiments.length; i++) {

        let prot1: ProtecaoEnum | undefined = undefined;
        switch (item.imbuiments[i]) {
          case ImbuimentProtecaoEnum.Fire: prot1 = ProtecaoEnum.Fire; break;
          case ImbuimentProtecaoEnum.Earth: prot1 = ProtecaoEnum.Earth; break;
          case ImbuimentProtecaoEnum.Energy: prot1 = ProtecaoEnum.Energy; break;
          case ImbuimentProtecaoEnum.Ice: prot1 = ProtecaoEnum.Ice; break;
          case ImbuimentProtecaoEnum.Holy: prot1 = ProtecaoEnum.Holy; break;
          case ImbuimentProtecaoEnum.Death: prot1 = ProtecaoEnum.Death; break;
        }

        if (item.imbuimentSlot > 1) {

          for (let j = i + 1; j < item.imbuiments.length; j++) {
            let prot2: ProtecaoEnum | undefined = undefined;
            switch (item.imbuiments[j]) {
              case ImbuimentProtecaoEnum.Fire: prot2 = ProtecaoEnum.Fire; break;
              case ImbuimentProtecaoEnum.Earth: prot2 = ProtecaoEnum.Earth; break;
              case ImbuimentProtecaoEnum.Energy: prot2 = ProtecaoEnum.Energy; break;
              case ImbuimentProtecaoEnum.Ice: prot2 = ProtecaoEnum.Ice; break;
              case ImbuimentProtecaoEnum.Holy: prot2 = ProtecaoEnum.Holy; break;
              case ImbuimentProtecaoEnum.Death: prot2 = ProtecaoEnum.Death; break;
            }

            if (prot2 != undefined) {
              dic.push([{ protecao: prot1, valorProtecao: (prot1 == ProtecaoEnum.Death ? 10 : 15) }, { protecao: prot2, valorProtecao: (prot2 == ProtecaoEnum.Death ? 10 : 15) }]);
            }
          }
        } else {
          dic.push([{ protecao: prot1, valorProtecao: (prot1 == ProtecaoEnum.Death ? 10 : 15) }]);
        }
      }
    }
    return dic;
  }

  obterItemMaiorProtecao(protecao: ProtecaoEnum, dicItens: { item: Item, protecao: ProtecaoEnum, valorProtecao: number }[]): { item: Item | undefined, valorProtecao: number } | undefined {
    let melhorProtecao: Item | undefined;

    let ultimoId: number = 0;
    let ultimaProtecao: number = 0;

    dicItens.filter(p => p.protecao == protecao).forEach(item => {
      if (ultimoId > 0) {

        if (item.valorProtecao > ultimaProtecao) {
          melhorProtecao = item.item;

          ultimoId = item.item.id;
          ultimaProtecao = item.valorProtecao;
        }
      } else {
        melhorProtecao = item.item;

        ultimoId = item.item.id;
        ultimaProtecao = item.valorProtecao;
      }
    })

    if (ultimaProtecao < 0)
      return undefined;

    return { item: melhorProtecao, valorProtecao: ultimaProtecao };
  }


  allImbuiments(): ImbuimentProtecaoEnum[] {
    return [
      ImbuimentProtecaoEnum.Fire,
      ImbuimentProtecaoEnum.Earth,
      ImbuimentProtecaoEnum.Energy,
      ImbuimentProtecaoEnum.Ice,
      ImbuimentProtecaoEnum.Holy,
      ImbuimentProtecaoEnum.Death,
    ]
  }



  imbuimentText(imbui: ProtecaoEnum): string {
    switch (imbui) {
      case ProtecaoEnum.Fire: return "Imbuiment Fire";
      case ProtecaoEnum.Earth: return "Imbuiment Earth";
      case ProtecaoEnum.Energy: return "Imbuiment Energy";
      case ProtecaoEnum.Ice: return "Imbuiment Ice";
      case ProtecaoEnum.Holy: return "Imbuiment Holy";
      case ProtecaoEnum.Death: return "Imbuiment Death";
      default: return "";
    }
  }

  imbuimentTextCompleto(imbui: ProtecaoEnum, percentual: number): string {
    return `${this.imbuimentText(imbui)} +${percentual}%`;
  }

  resertar() {
    this.damageInput = "";
    this.protecaoAtual_Physical = 0;
    this.protecaoAtual_LifeDrain = 0;
    this.protecaoAtual_ManaDrain = 0;
    this.protecaoAtual_Fire = 0;
    this.protecaoAtual_Earth = 0;
    this.protecaoAtual_Energy = 0;
    this.protecaoAtual_Ice = 0;
    this.protecaoAtual_Holy = 0;
    this.protecaoAtual_Death = 0;
    this.danoAtual_Physical = 0;
    this.danoAtual_LifeDrain = 0;
    this.danoAtual_ManaDrain = 0;
    this.danoAtual_Fire = 0;
    this.danoAtual_Earth = 0;
    this.danoAtual_Energy = 0;
    this.danoAtual_Ice = 0;
    this.danoAtual_Holy = 0;
    this.danoAtual_Death = 0;
    this.danoAtual_Total = 0;
    this.danoReal_Physical = 0;
    this.danoReal_LifeDrain = 0;
    this.danoReal_ManaDrain = 0;
    this.danoReal_Fire = 0;
    this.danoReal_Earth = 0;
    this.danoReal_Energy = 0;
    this.danoReal_Ice = 0;
    this.danoReal_Holy = 0;
    this.danoReal_Death = 0;
    this.danoReal_Total = 0;
    this.danoRealPercentual_Physical = 0;
    this.danoRealPercentual_LifeDrain = 0;
    this.danoRealPercentual_ManaDrain = 0;
    this.danoRealPercentual_Fire = 0;
    this.danoRealPercentual_Earth = 0;
    this.danoRealPercentual_Energy = 0;
    this.danoRealPercentual_Ice = 0;
    this.danoRealPercentual_Holy = 0;
    this.danoRealPercentual_Death = 0;
    this.protecaoSugestao_Physical = 0;
    this.protecaoSugestao_LifeDrain = 0;
    this.protecaoSugestao_ManaDrain = 0;
    this.protecaoSugestao_Fire = 0;
    this.protecaoSugestao_Earth = 0;
    this.protecaoSugestao_Energy = 0;
    this.protecaoSugestao_Ice = 0;
    this.protecaoSugestao_Holy = 0;
    this.protecaoSugestao_Death = 0;
    this.danoPossivel_Physical = 0;
    this.danoPossivel_LifeDrain = 0;
    this.danoPossivel_ManaDrain = 0;
    this.danoPossivel_Fire = 0;
    this.danoPossivel_Earth = 0;
    this.danoPossivel_Energy = 0;
    this.danoPossivel_Ice = 0;
    this.danoPossivel_Holy = 0;
    this.danoPossivel_Death = 0;
    this.danoPossivel_Total = 0;
    this.danoPossivelPercentual_Physical = 0;
    this.danoPossivelPercentual_LifeDrain = 0;
    this.danoPossivelPercentual_ManaDrain = 0;
    this.danoPossivelPercentual_Fire = 0;
    this.danoPossivelPercentual_Earth = 0;
    this.danoPossivelPercentual_Energy = 0;
    this.danoPossivelPercentual_Ice = 0;
    this.danoPossivelPercentual_Holy = 0;
    this.danoPossivelPercentual_Death = 0;
    this.limparSugestoes();
    this.calcular();
  }
}
