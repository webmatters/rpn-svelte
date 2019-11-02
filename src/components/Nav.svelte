<script>
	export let segment;
</script>

<style>
	.nav-container {
		border-bottom: 1px solid #eee;
		height: 50px;
	}
	nav {
		font-weight: 300;
		padding: 0 1em;
	}
	#brand {
		float: left;
		padding-left: 1rem;
	}
	ul {
		margin: 0;
		padding: 0;
		float: right;
	}
	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}
	li {
		display: block;
		float: left;
	}
	.selected {
		position: relative;
		display: inline-block;
	}
	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}
	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<div class="nav-container">
	<span id="brand">Royal Palm Nanny</span>
	<nav>
		<ul>
			<li><a class='{segment === undefined ? "selected" : ""}' href='become-a-nanny'>Become a Nanny</a></li>
			<li><a class='{segment === "register" ? "selected" : ""}' href='register'>Sign up</a></li>
			<li><a class='{segment === "login" ? "selected" : ""}' href='login'>Log in</a></li>
		</ul>
	</nav>
</div>