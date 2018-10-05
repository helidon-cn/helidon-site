<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>配置密钥</dt>
<dd slot="desc"><p>当安全性需要具有重复复杂元素的配置时，请使用Helidon Config。</p>

<p>此示例配置基本身份验证提供程序并保护Web服务器上的静态内容。它还包括Jersey的注释。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >保护静态内容</h2>
<div class="section">
<markup
lang="yaml"
title="application.yaml"
>security:
  providers:
    # 基于属性的访问控制，验证角色
    - abac:
    # HTTP基本认证
    - http-basic-auth:
        realm: "helidon"
        users:
          - login: "jack"
            password: "password"
            roles: ["user", "admin"]
          - login: "jill"
            password: "password"
            roles: ["user"]
          - login: "john"
            password: "password"
  # 保护静态内容 - 需要经过身份验证的用户
  web-server:
    paths:
      - path: "/static-cp[/{*}]"
        authenticate: true</markup>


<h3 >保护配置密钥</h3>
<div class="section">
<p>如果未向MicroProfile服务器提供Helidon Config的显式实例，则<strong>默认情况下会启用</strong>安全配置筛选器。
但是，如果不进行配置，则安全配置筛选器仅支持别名模板，以检查是否存在明文密码 (template ${CLEAR=&#8230;&#8203;}.</p>

<p>添加安全配置筛选器：</p>

<markup
lang="java"
title="Add secure config filter"
>Config helidonConfig = Config.builder()
    .addFilter(SecureConfigFilter.fromConfig())
    .build();</markup>

<p>将加密值放入配置文件中，以便将其存储在公共存储库中，而不会暴露密钥值。
请务必使用强密密码。</p>

<p>支持的模板是：</p>

<div class="block-title"><span>模版</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 11.111%;">
<col style="width: 33.333%;">
<col style="width: 55.556%;">
</colgroup>
<thead>
<tr>
<th>模版</th>
<th>描述</th>
<th>举例</th>
</tr>
</thead>
<tbody>
<tr>
<td>${CLEAR=&#8230;&#8203;}</td>
<td>Secret in clear text (for testing) - <code>requiresEncryption</code> must be disabled</td>
<td>${CLEAR=knownSecret}</td>
</tr>
<tr>
<td>${RSA=&#8230;&#8203;}</td>
<td>Public/private key encryption, base64 value</td>
<td>${RSA=aGr3sFCMQznixrgbIk9qNfoLnO1cdi3H86qweCNjxFvH4dYg5IQM1EuoyTjJaXcSCG5MBskpeA3bjnWYrzeAFFlZHuYSPsb+wJVzGLrfUColTn+BPJjpJ3rmEd3AVkJl1ASfBBMh3q3deC+rvUdhfoTGBO8sC0teUATklCQSxfHOnIxswxqrplnoGXToGiTIfehiN2IZNulRKeoDQ0AeoKREmq5au4L8OOmS+D9BqnlKMc0F1tULZ7+h3Cxla4lXC5WRPoPfHBU4vzRZOGzeDvLkRgrD60caw/wKn5M0Wy1A1cKR8E46ceBXCjJ2eWIcLyhZSAZWDe3ceNrawHZtCg==}</td>
</tr>
<tr>
<td>${AES=&#8230;&#8203;}</td>
<td>Shared secret ecryption, base64 value</td>
<td>${AES=D/UgMzsNb265HU1NDvdzm7tACHdsW6u1PjYEcRkV/OLiWcI+ET6Q4MKCz0zHyEh9}</td>
</tr>
<tr>
<td>${ALIAS=&#8230;&#8203;}</td>
<td>Reference to another key</td>
<td>${ALIAS=someOtherKey}</td>
</tr>
</tbody>
</table>
</div>
</div>

<h3 >需要加密</h3>
<div class="section">
<p>安全配置过滤器有一个选项，用于定义是否需要加密。如果它设置为true（默认值），那么：</p>

<ul class="ulist">
<li>
<p>使用$ {CLEAR = &#8230;&#8203;}模板的配置值将在请求时导致异常。</p>

</li>
<li>
<p>如果配置了 <code>security.config.aes.insecure-passphrase</code> ，则在引导期间过滤器会失败。</p>

</li>
</ul>
</div>

<h3 >使用对称加密（AES）</h3>
<div class="section">
<p>对称加密基于加密人员已知的public密钥，并且还提供给应用程序。</p>


<h4 >加密值（AES）</h4>
<div class="section">
<p>安全配置筛选器提供了可用于加密值的主类：<code>io.helidon.security.tools.config.Main</code></p>

<markup
lang="bash"
title="使用共享密钥  <code>masterPassword</code> 加密秘密 <code>secretToEncrypt</code>."
>java io.helidon.security.tools.config.Main aes masterPassword secretToEncrypt</markup>

<p>该工具将要输入的字符串作为属性值返回到配置中。</p>

</div>

<h4 >共享密钥（AES）</h4>
<div class="section">
<p>您可以通过以下几种方式提供共享密钥：</p>

<ul class="ulist">
<li>
<p>在配置中 - 仅用于测试/演示目的 - key是  <code>security.config.aes.insecure-passphrase</code></p>

</li>
<li>
<p>作为环境变量 - <code>SECURE_CONFIG_AES_MASTER_PWD</code></p>

</li>
</ul>
</div>
</div>

<h3 >使用非对称加密（RSA）</h3>
<div class="section">
<p>这种方法基于一对密钥，任何人都知道的公钥，以及有限的一方知道的私钥（通常是一个人或一个过程）。对于非对称加密，以下情况属实：</p>

<ul class="ulist">
<li>
<p>由公钥加密的值只能由私钥解密</p>

</li>
<li>
<p>由私钥加密的值只能由公钥解密</p>

</li>
</ul>
<p>使用安全配置筛选器时，应使用公钥加密配置值，并授予应用程序进程访问私钥以解密值的权限。</p>


<h4 >加密值（RSA）</h4>
<div class="section">
<p>安全配置筛选器提供了可用于加密值的主类：<code>io.helidon.security.tools.config.Main</code></p>

<markup
lang="bash"
title="使用密钥库中的公共证书加密密码 <code>secretToEncrypt</code>"
>java io.helidon.security.tools.config.Main rsa /path/to/keystore.p12 keystorePassword publicCertAlias secretToEncrypt</markup>

<p>该工具将要输入的字符串作为属性值返回到配置中。</p>

</div>

<h4 >配置安全配置过滤器（RSA）</h4>
<div class="section">
<p>您可以配置私钥的属性。这些密钥以 <code>security.config.rsa</code> 为前缀。</p>

<div class="block-title"><span>RSA配置选项：密钥库</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 25%;">
<col style="width: 41.667%;">
</colgroup>
<thead>
<tr>
<th>What</th>
<th>配置 Key</th>
<th>环境变量</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>Keystore path</td>
<td><code>keystore-path</code></td>
<td><code>SECURE_CONFIG_RSA_PRIVATE_KEY</code></td>
<td>Keystore is located in file system</td>
</tr>
<tr>
<td>Keystore</td>
<td><code>keystore-resource-path</code></td>
<td>N/A</td>
<td>Keystore is located on classpath</td>
</tr>
<tr>
<td>Private key alias</td>
<td><code>key-alias</code></td>
<td><code>SECURE_CONFIG_PRIVATE_KEY_ALIAS</code></td>
<td>Alias of the private key (such as "1", which is usually the default)</td>
</tr>
<tr>
<td>Keystore passphrase</td>
<td><code>keystore-passphrase</code></td>
<td><code>SECURE_CONFIG_PRIVATE_KEYSTORE_PASSPHRASE</code></td>
<td>Password for the keystore (and private key).</td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>RSA配置选项：PEM（PKCS＃8）私钥</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 25%;">
<col style="width: 41.667%;">
</colgroup>
<thead>
<tr>
<th>What</th>
<th>配置 Key</th>
<th>环境变量</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>Path</td>
<td><code>pem-key-path</code></td>
<td><code>SECURE_CONFIG_RSA_PEM_KEY</code></td>
<td>Key is located on file system</td>
</tr>
<tr>
<td>Resource path</td>
<td><code>pem-key-resource-path</code></td>
<td>N/A</td>
<td>Key is located on classpath</td>
</tr>
<tr>
<td>Passphrase</td>
<td><code>pem-key-passphrase</code></td>
<td><code>SECURE_CONFIG_PRIVATE_KEY_PASSPHRASE</code></td>
<td>Password protecting the private key</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="yaml"
title="yaml 配置举例"
>security.config:
  # Set to true for production - if set to true, clear text passwords will cause failure
  require-encryption: false
  # The "master" password for AES decryption. For production, set this via system property or environment variable.
  aes.insecure-passphrase: "myMasterPasswordForEncryption"
  # See documentation of pki-util
  rsa:
    # load from classpath
    keystore-resource-path: ".ssh/keystore.p12"
    # If keystore is used, alias to use from the keystore (in this example, it is "1")
    key-alias: "1"
    # Password of keystore
    keystore-passphrase: "helidon"</markup>

</div>
</div>
</div>
</doc-view>
