<script setup lang="ts"></script>

<template>
  <div>
    <ComponentTitle title="账户管理"></ComponentTitle>

    <ComponentTitle title="安全管理"> </ComponentTitle>

    <ARow :gutter="16">
      <ACol :span="8">
        <Cell title="登录IP白名单">
          <template #action>
            <AButton type="primary">修改</AButton>
          </template>
          <template #default>
            <AForm
              :label-col="{ style: { width: '100px' } }"
              autocomplete="off"
            >
              <AFormItem label="状态">
                <ASwitch :checked="true" />
              </AFormItem>
              <AFormItem label="登录IP白名单">
                <ATextarea class="w-60 !h-28" />
              </AFormItem>
            </AForm>
          </template>
        </Cell>
      </ACol>
      <ACol :span="8">
        <Cell title="提现IP白名单">
          <template #action>
            <AButton type="primary">修改</AButton>
          </template>
          <template #default>
            <AForm
              :label-col="{ style: { width: '100px' } }"
              autocomplete="off"
            >
              <AFormItem label="状态">
                <ASwitch :checked="true" />
              </AFormItem>
              <AFormItem label="登录IP白名单">
                <ATextarea class="w-60 !h-28" />
              </AFormItem>
            </AForm>
          </template>
        </Cell>
      </ACol>
    </ARow>
  </div>
</template>
